import { NextResponse } from 'next/server';
import Typesense from 'typesense';

const typesense = new Typesense.Client({
  nodes: [{
    host: 'b4es230vctrgl7mhp-1.a1.typesense.net',
    port: 443,
    protocol: 'https'
  }],
  apiKey: '7uFptqJOs8QsyMOi84YQil8JfXXfA47H'
});



function convertToISODate(inputDate: string): string {
  if (!inputDate) return '';
  
 
  if (inputDate.includes('T') && inputDate.endsWith('Z')) {
    return inputDate;
  }


  const dateParts = inputDate.match(/(\d{1,2}) (\w{3}) (\d{4}) at (\d{2}):(\d{2}):(\d{2}) UTC([+-]\d{1,2}):(\d{2})/);
  
  if (dateParts) {
    const months: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    
    const day = parseInt(dateParts[1]);
    const month = months[dateParts[2]];
    const year = parseInt(dateParts[3]);
    const hour = parseInt(dateParts[4]);
    const minute = parseInt(dateParts[5]);
    const second = parseInt(dateParts[6]);
    const tzOffset = parseInt(dateParts[7]) * 60 + parseInt(dateParts[8]);
    
    const date = new Date(Date.UTC(year, month, day, hour, minute, second));
    date.setMinutes(date.getMinutes() - tzOffset);
    
    return date.toISOString();
  }

  // Fallback for other formats
  return new Date(inputDate).toISOString();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const per_page = Number(searchParams.get('per_page')) || 8;

  if (!q) {
    return NextResponse.json(
      { error: 'Missing query parameter "q"' },
      { status: 400 }
    );
  }

  try {
    const currentDate = new Date();
    const resultsPerCollection = Math.ceil(per_page / 4);
    
    
    const searchRequests = [
      {
        collection: 'events',
        q,
        query_by: 'title,description',
        filter_by: 'status:=published',
        per_page: resultsPerCollection * 2 
      },
      {
        collection: 'announcements',
        q,
        query_by: 'title,description',
        filter_by: 'status:=published',
        per_page: resultsPerCollection * 2
      },
      {
        collection: 'benedictoryCourses',
        q,
        query_by: 'title,description,language',
        per_page: resultsPerCollection * 3 
      },
      {
        collection: 'temporaryPages',
        q,
        query_by: 'title,content',
        per_page: resultsPerCollection * 2
      }
    ];


    const searchResponse = await typesense.multiSearch.perform({ 
      searches: searchRequests 
    });
    
   
    const results = (searchResponse as any)['results'];
    
    // Process collections separately to maintain balance
    const collectionResults: Record<string, any[]> = {
      events: [],
      announcements: [],
      benedictoryCourses: [],
      temporaryPages: []
    };

    results.forEach((collectionResult: any, index: number) => {
      if (!collectionResult.hits || collectionResult.hits.length === 0) return;
      
      const collectionName = searchRequests[index].collection;
      
      collectionResult.hits.forEach((hit: any) => {
        const document = hit.document;
        const baseResult = {
          id: document.id,
          title: document.title || 'Untitled',
          collection: collectionName,
          text_match: hit.text_match,
          highlight: hit.highlight
        };

        let result;
        switch (collectionName) {
          case 'temporaryPages':
            result = {
              ...baseResult,
              description: document.content || '',
              link: document.link || ''
            };
            break;
            
          case 'benedictoryCourses':
            const liveFromISO = convertToISODate(document.liveFrom);
            const liveFromDate = liveFromISO ? new Date(liveFromISO) : null;
            
            // Skip future-dated courses
            if (liveFromDate && liveFromDate > currentDate) return;
            
            result = {
              ...baseResult,
              description: document.description || '',
              slug: document.slug || '',
              language: document.language || [{ full: "English", short: "en" }],
              liveFrom: document.liveFrom || ''
            };
            break;
            
          default: 
            result = {
              ...baseResult,
              description: document.description || '',
              slug: document.slug || '',
              status: document.status || 'published'
            };
        }
        
        collectionResults[collectionName].push(result);
      });
    });

    
    Object.keys(collectionResults).forEach(collection => {
      collectionResults[collection] = collectionResults[collection]
        .sort((a, b) => (b.text_match || 0) - (a.text_match || 0))
        .slice(0, resultsPerCollection);
    });

    
    const finalResults = [
      ...collectionResults.events,
      ...collectionResults.announcements,
      ...collectionResults.benedictoryCourses,
      ...collectionResults.temporaryPages
    ];

    return NextResponse.json({
      results: finalResults,
      counts: {
        events: collectionResults.events.length,
        announcements: collectionResults.announcements.length,
        benedictoryCourses: collectionResults.benedictoryCourses.length,
        temporaryPages: collectionResults.temporaryPages.length
      }
    });
  } catch (err) {
    console.error('Search error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch search results', details: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}