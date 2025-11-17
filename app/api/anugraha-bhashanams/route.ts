import { NextRequest } from 'next/server';
import { db } from '../../src/firebase';
import { Timestamp } from 'firebase/firestore';

export async function GET(req: NextRequest) {
  try {
    const now = Timestamp.now();
    
    const snapshot = await db
      .collection('benedictoryCourses')
      .where('liveFrom', '<=', now)
      .get();

    const courses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(
      JSON.stringify({ success: true, data: courses }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error fetching benedictory discourses:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return new Response(
      JSON.stringify({ success: false, message: 'Internal Server Error', error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
