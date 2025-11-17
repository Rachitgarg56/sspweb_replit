import { NextRequest, NextResponse } from 'next/server';
import { Timestamp } from "firebase/firestore";
import {db} from '../../../src/firebase';
import { wrapYouTubeIframes } from '@/utils/helpers';

interface Props {
    params: Promise<{ slug: string }>;
}

interface Event {
    id: string;
    title: string;
    date: {
        seconds: number;
        nanoseconds: number;
    };
    location: string;
    description: string;
    images: string[];
    yTLink: string;
    slug: string;
}

export async function GET(request: Request, props: Props) {
    const params = await props.params;
    const { slug } = params;
    const response = await db.collection('events').where("slug", "==", slug).get();

    if (response.empty) {
        return NextResponse.json({ error: 'event not found' }, { status: 404 });
    }
    const event = response.docs[0].data();

    // Determine if the event is in the past
    const eventDate = event.date.toDate(); // Convert Firestore timestamp to JavaScript Date
    const currentDate = new Date();
    const isPastEvent = eventDate < currentDate;

    const formattedCurrentDate = Timestamp.fromDate(new Date());

    // Fetch remaining upcoming events
    const upcomingEventsResponse = await db.collection('events')
        .where('date', '>=', formattedCurrentDate)
        .where('slug', '!=', slug) 
        .orderBy('date', 'asc')
        // .limit(2)
        .get();

    const upcomingEvents = upcomingEventsResponse.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

    // Fetch remaining past events
    const pastEventsResponse = await db.collection('events')
    .where('date', '<', formattedCurrentDate)        
    .orderBy('date', 'desc')        
    .get();

    let pastEvents = pastEventsResponse.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
    
    pastEvents = pastEvents.filter((event: Event) => event.slug !== slug);

    let prevEvent = null;
    let nextEvent = null;

    const toDate = (timestamp: { seconds: number; nanoseconds: number }) => new Date(timestamp.seconds * 1000);

    if (isPastEvent) {
        prevEvent = pastEvents
            .filter((e: Event) => toDate(e.date) < eventDate)
            .sort((a: Event, b: Event) => toDate(b.date).getTime() - toDate(a.date).getTime())[0] || null;

        nextEvent = pastEvents
            .filter((e: Event) => toDate(e.date) > eventDate)
            .sort((a: Event, b: Event) => toDate(a.date).getTime() - toDate(b.date).getTime())[0] || null;
    } else {
        prevEvent = upcomingEvents
            .filter((e: Event) => toDate(e.date) < eventDate)
            .sort((a: Event, b: Event) => toDate(b.date).getTime() - toDate(a.date).getTime())[0] || null;

        nextEvent = upcomingEvents
            .filter((e: Event) => toDate(e.date) > eventDate)
            .sort((a: Event, b: Event) => toDate(a.date).getTime() - toDate(b.date).getTime())[0] || null;
    }

    event.description = wrapYouTubeIframes(event.description);

    return NextResponse.json({
        event,
        upcomingEvents: upcomingEvents.slice(0,2),
        pastEvents: pastEvents.slice(0,2),
        nextEvent,
        prevEvent,
    });
}