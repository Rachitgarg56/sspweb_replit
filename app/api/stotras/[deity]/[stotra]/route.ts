import { NextResponse } from 'next/server';
import { db } from '../../../../src/firebase';

export async function GET(
    req: Request,
    props: { params: Promise<{ deity: string; stotra: string }> }
) {
    const params = await props.params;

    try {
        const deitySnap = await db.collection('deities').where('url', '==' , params.deity).get();


        const excludedStotraId = "sp4dZaniVBezvUlxqWx5";

        const rawData = deitySnap.docs[0].data();

        const deity = {
        id: deitySnap.docs[0].id,
        ...rawData,
        stotras: (rawData.stotras || []).filter((s: any) => s.id !== excludedStotraId),
        };


        const stotraSnap = await db.collection(`deities/${deity.id}/stotras`).where('url', '==', params.stotra).get();
        const stotra = { id: stotraSnap.docs[0].id, ...stotraSnap.docs[0].data() };

        const shlokasSnap = await db.collection(`deities/${deity.id}/stotras/${stotra.id}/shlokas`).orderBy('orderId', 'asc').get();

        const shlokas = shlokasSnap.docs.map((doc) => {
            const data = doc.data()
            return { id: doc.id, ...data}
        })

        return NextResponse.json({shlokas, deity, stotra});
    } catch (err) {
        console.error('Error fetching deity/stotra/shlokas:', err);
    }

}
