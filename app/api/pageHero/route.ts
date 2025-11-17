import { NextResponse } from 'next/server';
import { db } from '../../src/firebase';

export async function GET() {
   
    const response = await db.collection('internalHeroImages').get();
    if(response.empty) {
        return NextResponse.json({ error: 'No hero-image found' }, { status: 404 });
    }
    let heroImages = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(heroImages);
}
