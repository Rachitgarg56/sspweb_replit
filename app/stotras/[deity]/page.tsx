import React, { cache } from 'react'
import PageContent from './PageContent'
import { API_URL } from '@/config/api';

interface PageProps {
    params: Promise<{deity:string}>;
}

const getDeity = cache(async (deity: string) => {
    try {
        const res = await fetch(`${API_URL}stotras/${deity}`);
        const parsedRes = await res.json();
        return parsedRes;
    } catch (error) {
        console.error(error);
    }
})

export async function generateMetadata({ params }: PageProps) {
    const { deity } = await params;
    const data = await getDeity(deity);
    const { deityData } = data;
    const title = deityData?.title?.find((obj) => obj.lang === 'sa')?.value || "";
    return {
        title: title,
        description: `${title}: Sri Sringeri Sharada Peetham`,
        openGraph: {
            title: title,
            description: `${title}: Sri Sringeri Sharada Peetham`,
            images: [
                {
                    url: "/assets/images/events_hero.jpg",
                    alt: title,
                },
            ],
            type: "website",
        }
    };
}

const page = async ({ params }: PageProps) => {
    const { deity } = await params;
    const data = await getDeity(deity);
    return (
        <PageContent data={data}/>
    )
}

export default page
