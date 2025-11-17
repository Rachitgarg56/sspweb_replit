import { cache } from 'react';
import PageContent from './PageContent';
import { API_URL } from '@/config/api';

interface PageProps {
    params: Promise<{ deity: string; stotra: string; }>,
}

const getData = cache(async (deity: string, stotra: string) => {
    const res = await fetch(`${API_URL}stotras/${deity}/${stotra}`);  
    const data = await res.json();
    return data;
})

export async function generateMetadata({ params }: PageProps) {
    const { deity, stotra } = await params;
    const data = await getData(deity,stotra);
    const title = data.stotra?.title?.find((obj) => obj.lang === 'sa')?.value || "";
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
    const { deity, stotra } = await params;
    const data = await getData(deity,stotra);
    return (
      <PageContent data={data}/>
    )
}

export default page
