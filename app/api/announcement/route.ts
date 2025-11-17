import { NextResponse } from 'next/server';
import { db } from '../../src/firebase';

export async function GET() {
   
    const response = await db.collection('announcements')
    .orderBy("date", "desc")
    .where('status', '==', 'published')
    .get();
    if(response.empty) {
        return NextResponse.json({ error: 'No announcements found' }, { status: 404 });
    }
    let announcements = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(announcements);
}
