import { NextResponse } from 'next/server';
import { db } from '../../src/firebase';

export async function GET() {
   
    const response = await db.collection('events').orderBy("date", "desc").where('status', '==', 'published').get();
    if(response.empty) {
        return NextResponse.json({ error: 'No events found' }, { status: 404 });
    }
    let events = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(events);
}
