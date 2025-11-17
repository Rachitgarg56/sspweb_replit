import { NextResponse } from 'next/server';
import { db } from '../../../src/firebase';

export async function GET(
    req: Request,
    props: { params: Promise<{ slug: string }> }
) {
    const params = await props.params;
    const { slug } = params;
    
    const collectionSnap = await db.collection("stotraCollections").where("url", "==", slug).get();
    
    if (collectionSnap.empty) {
        return NextResponse.json({ error: 'No collection found' }, { status: 404 });
    }

    const docData = collectionSnap.docs[0];

    const collection = {...docData.data(), id: docData.id};
    
    return NextResponse.json(collection);
}
