import { NextResponse } from 'next/server';
import { db } from '../../src/firebase';

export async function GET() {
   
    const response = await db.collection('stotraCollections').get();
    if(response.empty) {
        return NextResponse.json({ error: 'No collection found' }, { status: 404 });
    }
    let collections = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(collections);
}
