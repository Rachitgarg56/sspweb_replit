import { db } from '../../src/firebase';
import Typesense from 'typesense';
import { NextResponse } from 'next/server';

const typesense = new Typesense.Client({
  nodes: [{
    host: process.env.TYPESENSE_HOST || 'b4es230vctrgl7mhp-1.a1.typesense.net',
    port: 443,
    protocol: 'https'
  }],
  apiKey: process.env.TYPESENSE_API_KEY || '', 
  connectionTimeoutSeconds: 5
});

const COLLECTION_SCHEMAS = [
  {
    name: 'events',
    fields: [
      { name: 'title', type: 'string' as const },
      { name: 'description', type: 'string' as const },
      { name: 'slug', type: 'string' as const },
      { name: 'status', type: 'string' as const }
    ]
  },
  {
    name: 'announcements',
    fields: [
      { name: 'title', type: 'string' as const },
      { name: 'description', type: 'string' as const },
      { name: 'slug', type: 'string' as const },
      { name: 'status', type: 'string' as const }
    ]
  },
  {
    name: 'benedictoryCourses',
    fields: [
      { name: 'title', type: 'string' as const },
      { name: 'description', type: 'string' as const },
      { name: 'slug', type: 'string' as const },
      { name: 'language', type: 'string' as const }, 
      { name: 'liveFrom', type: 'string' as const } 
    ],
    enable_nested_fields: true 
  },
  {
    name: 'temporaryPages',
    fields: [
      { name: 'title', type: 'string' as const },
      { name: 'link', type: 'string' as const },
      { name: 'content', type: 'string' as const }
    ]
  }
];

function isValidCronRequest(request: Request): boolean {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  const cronSecret = request.headers.get('authorization');
  const userAgent = request.headers.get('user-agent');
  
  if (!process.env.CRON_SECRET) {
    return true;
  }
  
  return (
    userAgent?.includes('vercel') || 
    cronSecret === `Bearer ${process.env.CRON_SECRET}`
  );
}

// Helper function to get IST time
function getISTTime(): string {
  const now = new Date();
  const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000)); // UTC + 5:30
  return istTime.toISOString().replace('T', ' ').substring(0, 19) + ' IST';
}

export async function POST(request: Request) {
  try {
    console.log(`🕐 Cron sync started at ${getISTTime()}`);
    
    const importResults: any[] = [];

    for (const schema of COLLECTION_SCHEMAS) {
      const { name, fields, ...options } = schema;
      
      try {
        // Delete existing collection
        try {
          await typesense.collections(name).delete();
          console.log(`Deleted existing collection: ${name}`);
        } catch (err) {
          console.log(`Creating new collection: ${name}`);
        }

        // Create collection
        await typesense.collections().create({
          name,
          fields: [
            { name: 'id', type: 'string' as const },
            ...fields
          ],
          ...options 
        });

        // Fetch data from Firebase
        const snapshot = await db.collection(name).get();
        console.log(`Fetched ${snapshot.docs.length} documents from ${name}`);

        // Process documents
        const documents = [];
        const failedDocuments: Array<{ id: string; error: string }> = [];

        for (const doc of snapshot.docs) {
          try {
            const data = doc.data();
            const filteredData: any = { id: doc.id };

            for (const field of fields) {
              if (data[field.name] !== undefined) {
                if (field.name === 'language') {
                  filteredData.language = formatLanguageFieldAsString(data.language);
                } 
                else if (field.name === 'liveFrom') {
                  filteredData.liveFrom = formatLiveFromField(data.liveFrom);
                } 
                else {
                  filteredData[field.name] = sanitizeField(data[field.name], field.type);
                }
              }
            }

            documents.push(filteredData);
          } catch (docError) {
            console.error(`Error processing document ${doc.id}:`, docError);
            failedDocuments.push({
              id: doc.id,
              error: docError instanceof Error ? docError.message : String(docError)
            });
          }
        }

        if (documents.length > 0) {
          try {
            const importResponse = await typesense.collections(name)
              .documents()
              .import(documents, { action: 'upsert' });

            const importResponseArray = Array.isArray(importResponse) 
              ? importResponse 
              : [importResponse];

            const errors = importResponseArray
              .map((item: any) => item)
              .filter((item: any) => item.error);

            if (errors.length > 0) {
              console.error(`Import errors for ${name}:`, errors);
            }

            importResults.push({
              collection: name,
              total: snapshot.docs.length,
              success: documents.length - errors.length,
              failed: failedDocuments.length + errors.length,
              documentErrors: [
                ...failedDocuments, 
                ...errors.map((e: any) => ({
                  id: e.document?.id || 'unknown',
                  error: e.error || 'Unknown import error'
                }))
              ]
            });

            console.log(`✅ Successfully imported ${documents.length - errors.length} documents to ${name}`);
          } catch (importErr) {
            console.error(`Import failed for ${name}:`, importErr);
            importResults.push({
              collection: name,
              status: 'error',
              error: importErr instanceof Error ? importErr.message : String(importErr),
              failedDocuments
            });
          }
        } else {
          importResults.push({
            collection: name,
            total: snapshot.docs.length,
            success: 0,
            failed: failedDocuments.length,
            documentErrors: failedDocuments
          });
        }
      } catch (collectionError) {
        console.error(`Error processing collection ${name}:`, collectionError);
        importResults.push({
          collection: name,
          status: 'error',
          error: collectionError instanceof Error ? collectionError.message : String(collectionError)
        });
      }
    }

    console.log(`🎉 Cron sync completed at ${getISTTime()}`);

    return NextResponse.json({
      success: importResults.every(r => r.status !== 'error'),
      syncTime: getISTTime(),
      triggeredBy: 'vercel-cron',
      results: importResults
    });
  } catch (err) {
    console.error('Sync error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error',
        details: err instanceof Error ? err.stack : undefined,
        syncTime: getISTTime()
      },
      { status: 500 }
    );
  }
}

// Add GET method for manual testing and health checks
export async function GET() {
  return NextResponse.json({
    status: 'Typesense Sync API is running',
    currentTime: getISTTime(),
    scheduledTimes: [
      '06:00 AM IST (Morning)',
      '12:00 PM IST (Afternoon)', 
      '06:00 PM IST (Evening)',
      '12:00 AM IST (Midnight)'
    ],
    timezone: 'Indian Standard Time (UTC +5:30)'
  });
}

// Helper functions
function formatLanguageFieldAsString(languageData: any): string {
  if (!languageData) return JSON.stringify([{ full: "English", short: "en" }]);
  
  if (Array.isArray(languageData)) {
    return JSON.stringify(languageData);
  }
  
  if (typeof languageData === 'object') {
    return JSON.stringify([languageData]);
  }
  
  return JSON.stringify([{ full: String(languageData), short: "en" }]);
}

function formatLiveFromField(liveFromData: any): string {
  if (!liveFromData) return '';
  
  if (typeof liveFromData === 'string') return liveFromData;
  
  if (liveFromData.toDate && typeof liveFromData.toDate === 'function') {
    return liveFromData.toDate().toISOString();
  }
  
  if (liveFromData instanceof Date) {
    return liveFromData.toISOString();
  }
  
  return String(liveFromData);
}

function sanitizeField(value: any, fieldType: string): any {
  if (value === null || value === undefined) return '';
  
  switch (fieldType) {
    case 'string':
      return String(value);
    case 'int32':
    case 'int64':
      return parseInt(String(value)) || 0;
    case 'float':
      return parseFloat(String(value)) || 0;
    case 'bool':
      return Boolean(value);
    default:
      return value;
  }
}