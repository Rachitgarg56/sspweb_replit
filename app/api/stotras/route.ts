import { NextResponse } from 'next/server';
import { db } from '../../src/firebase';

export async function GET() {
    
    const response = await db.collection("deities").orderBy("orderId", "asc").get();
    
    if(response.empty) {
        return NextResponse.json({ error: 'No deities found' }, { status: 404 });
    }

    const excludedStotraId = "sp4dZaniVBezvUlxqWx5";

    const deitiesData = response.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        stotras: (data.stotras || []).filter((s: any) => s.id !== excludedStotraId),
      };
    });
    
    return NextResponse.json(deitiesData);
}
