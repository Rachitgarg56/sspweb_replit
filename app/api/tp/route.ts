import { NextResponse } from 'next/server';
import { db } from '../../src/firebase';

export async function GET() {
   
    const response = await db.collection('temporaryPages').get();
    if(response.empty) {
        return NextResponse.json({ error: 'No Pages found' }, { status: 404 });
    }
    let tempPages = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(tempPages);
}