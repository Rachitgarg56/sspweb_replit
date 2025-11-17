import { NextResponse } from 'next/server';
import { db } from '../../../src/firebase';

export async function GET(
    req: Request,
    props: { params: Promise<{ deity: string }> }
) {
    const params = await props.params;
    const { deity } = params;

    try {
        const deitySnap = await db.collection('deities').where('url', '==', deity).get();
        let deityData;

        if (deitySnap.empty) {
            console.log("No matching deity found");
        } else {
            const excludedStotraId = "sp4dZaniVBezvUlxqWx5";

            const rawData = deitySnap.docs[0].data();
    
            deityData = {
            id: deitySnap.docs[0].id,
            ...rawData,
            stotras: (rawData.stotras || []).filter((s: any) => s.id !== excludedStotraId),
            };
        }

        const deitiesSnap = await db.collection('deities').orderBy('orderId').get();
        let deitiesData;
        
        if (deitiesSnap.empty) {
            console.log("No deities found");
        } else {
            deitiesData = deitiesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
            return NextResponse.json({ deitiesData, deityData });
        }

    } catch (error) {
        console.error("Error fetching deity:", error);
        return NextResponse.json({ error: "Failed to fetch deity" }, { status: 500 });
    }
}
