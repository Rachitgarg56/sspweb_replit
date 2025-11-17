import { API_URL } from '@/config/api';
import PageContent from './PageContent'
import { Metadata } from "next";
import { cache } from 'react';
import { getFirstNWords, stripHTML } from '../../../utils/helpers'

interface Props {
    params: Promise<{ slug: string }>; 
}

const getEvent = cache(async (slug: string) => {
    const res = await fetch(`${API_URL}events/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch event data");
    const data = await res.json();
    return data;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const { event } = await getEvent(slug);

    return {
        title: event?.title,
        description: event?.description,
        openGraph: {
            title: event?.title,
            description: getFirstNWords(stripHTML(event?.description), 50),
            images: [
                {
                    url: !event?.images?.length ? "/assets/images/events/event-placeholder.jpg" : `https://files.sringeri.net/${event.images[0]}`,
                    alt: event?.title,
                },
            ],
            type: "website",
        }
    };
}

export default async function EventPage({ params }: Props) {
    const { slug } = await params;
    const data = await getEvent(slug);
    return (
        <PageContent params={params} eventsData={data}/>
    )
}
