import { NextResponse } from 'next/server';
import { db } from '../../src/firebase';

export async function GET(request: Request) {
    const response = await db.collection('heroImages')
        .orderBy('orderId')
        .where('isActive', '==', true)
        .get();

    if (response.empty) {
        return NextResponse.json({ error: 'data not found' }, { status: 404 });
    }
    const data = response.docs.map((doc) => {
        const data = doc.data()
        return { id: doc.id, ...data}
    })

    const res = await db.collection('settings')
    .doc('youtubeLive').get();

    const ytData = res.data()

    const resp = await db.collection('homepageActions').orderBy('orderId', 'asc').get();
    const homepageActions = resp.docs.map((doc) => {
        const data = doc.data()
        return { id: doc.id, ...data}
    })

    return NextResponse.json({
        heroSlidesData: data,
        ytData,
        homepageActions,
    });
}