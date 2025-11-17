import { db } from "../../src/firebase";
import { NextResponse } from "next/server";
import { Timestamp } from "firebase/firestore";

interface PageDataProps {
    params: Promise<{ year: string }>; 
}

export async function GET(req: Request, props: PageDataProps) {
    const params = await props.params;
    const { year } = params;

    const startOfYear = Timestamp.fromDate(new Date(`${year}-01-01T00:00:00Z`));
    const endOfYear = Timestamp.fromDate(new Date(`${year}-12-31T23:59:59Z`));

    const pastEventsResponse = await db.collection('events')
        .where('date', '>=', startOfYear)
        .where('date', '<=', endOfYear)
        .orderBy('date', 'desc')
        .get();

    const pastEvents = pastEventsResponse.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

    if (pastEvents.length) {
        return NextResponse.json(pastEvents); 
    } else {
        console.error("No events present");
        return NextResponse.json({ message: "No events found" }, { status: 404 }); 
    }
    
}
