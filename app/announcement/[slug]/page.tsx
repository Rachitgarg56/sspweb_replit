import { API_URL } from "@/config/api";
import PageContent from "./PageContent";
import { getFirstNWords, stripHTML } from "@/utils/helpers";
import { Metadata } from "next";
import { cache } from "react";

interface Props {
    params: Promise<{ slug: string }>; 
}

const getAnnouncement = cache(async (slug: string) => {
    const res = await fetch(`${API_URL}announcement/${slug}`);
    if (!res.ok) {
        throw new Error("Failed to fetch announcement details");
    }
    const data = await res.json();
    return data;
})

const getAnnouncements = cache(async (slug: string) => {
    const res = await fetch(API_URL + "announcement")
    if (!res.ok) {
        throw new Error("Failed to fetch announcements details");
    }
    const parsedRes = await res.json()
    return parsedRes;
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const announcement = await getAnnouncement(slug);

    return {
        title: announcement?.title,
        description: announcement?.description,
        openGraph: {
            title: announcement?.title,
            description: getFirstNWords(stripHTML(announcement?.description), 50),
            images: [
                {
                    url: !announcement?.images?.length ? "/assets/images/announcements/announcement1.png" : `https://files.sringeri.net/${announcement.images[0]}`,
                    alt: announcement?.title,
                },
            ],
            type: "website",
        }
    };
}

export default async function AnnouncementPage({ params }: Props) {
    const { slug } = await params;
    const announcement = await getAnnouncement(slug);
    const announcements = await getAnnouncements(slug);
    return (
        <PageContent params={params} announcementsData={{announcement, announcements}}/>
    );
}
