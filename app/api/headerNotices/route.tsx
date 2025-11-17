import { NextResponse } from 'next/server';
import { db } from '../../src/firebase';

export async function GET() {
  try {
    const snapshot = await db.collection('headerNotices').where('isActive', '==', true).get();

    if (snapshot.empty) {
      return NextResponse.json({ error: 'No notices found' }, { status: 404 });
    }

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
     
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error fetching header notices:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
