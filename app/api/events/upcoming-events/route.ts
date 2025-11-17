import { NextRequest, NextResponse } from 'next/server';
import { query, Timestamp } from "firebase/firestore";
import {db} from '../../../src/firebase';

export async function GET(request: NextRequest) {
     const currentDate = new Date(); 
     const formattedCurrentDate = Timestamp.fromDate(new Date()); 

     const { searchParams } = new URL(request.url);
     const showDrafts = searchParams.has('showDrafts');

     let query = db.collection('events')
         .where('date', '>=', formattedCurrentDate)

     if (!showDrafts) {
        query = query.where('status', '==', 'published').orderBy('date', 'asc');
     } else {
        query = query.orderBy('date', 'asc');
     }

     const upcomingEventsResponse = await query.get();
 
     const upcomingEvents = upcomingEventsResponse.docs.map(doc => ({
         id: doc.id,
         ...doc.data(),
     }));

    return NextResponse.json(upcomingEvents);
}