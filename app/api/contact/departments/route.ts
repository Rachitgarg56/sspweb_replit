import { NextResponse } from 'next/server';
import { db } from '../../../src/firebase';

export async function GET() {
   
    const response = await db.collection('departments').orderBy("orderId", "asc").get();
    if(response.empty) {
        return NextResponse.json({ error: 'No department found' }, { status: 404 });
    }
    let departments = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(departments);
}
