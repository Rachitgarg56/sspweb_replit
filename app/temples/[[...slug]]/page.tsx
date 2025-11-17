import { API_URL } from '@/config/api';
import PageContent from './PageContent'
import { Metadata } from "next";
import { cache } from 'react';
import { getFirstNWords, stripHTML } from '../../../utils/helpers'

interface Props {
    params: Promise<{ slug: string[] }>; 
}

const getTemple = cache(async (slugStr: string) => {
    const res = await fetch(`${API_URL}tp/temples/${slugStr}`);
    const data = await res.json();
    return data;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    let slugStr = '';
    if (slug) slugStr = slug.join('/');
    const temple = await getTemple(slugStr);

    return {
        title: temple?.title,
        description: getFirstNWords(stripHTML(temple?.content), 50),
        openGraph: {
          title: temple?.title,
            description: getFirstNWords(stripHTML(temple?.content), 50),
            images: [
                {
                    url: temple?.images?.length ? `https://files.sringeri.net/${temple.images[0]}` : '',
                    alt: temple?.title,
                },
            ],
            type: "website",
        }
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    let slugStr = '';
    if (slug) slugStr = slug.join('/');
    const data = await getTemple(slugStr);
    
    return (
        <PageContent params={params} templeData={data}/>
    )
}
