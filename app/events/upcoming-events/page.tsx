import BreadCrumbs from "../../../app/components/BreadCrumbs";
import { API_URL } from "../../../config/api";
import { Event } from "@/app/src/types";
import LoadMoreEvents from "@/app/components/LoadMoreEvents";

export async function generateMetadata() {
    return {
        title: "Upcoming Events in Sringeri",
        description: "Upcoming Events in Sri Sringeri Sharada Peetham",
        openGraph: {
            title: "Upcoming Events in Sringeri",
            description: "Upcoming Events in Sri Sringeri Sharada Peetham",
            images: [
                {
                    url: "/assets/images/events/event-placeholder.jpg",
                    alt: "Upcoming Events in Sringeri",
                },
            ],
            type: "website",
        }
    };
}

export default async function Page({
    searchParams
  }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
    const params = await searchParams
    const showDrafts = 'showDrafts' in params
    const queryParam = showDrafts ? '?showDrafts' : ''
    const events: Event[] = await fetch(API_URL + `events/upcoming-events${queryParam}`).then((res) => res.json());

    let breadcrumbs = [
        { title: "Home", link: "/" },
        { title: "Events", link: "/events", desktopClick: false },
        { title: "Upcoming Events", link: "/events/upcoming-events" },
    ]
    const breadcrumbsSeperator = '|';

    return (
        <div className="bg-[var(--gray-100)] p-4 sm:p-8 pb-12 md:pb-4 overflow-hidden">
            {/* featured events */}
            <div className="max-w-[1175px] mx-auto">
                <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator} />
                <div className="grid grid-cols-1 gap-8 flex-1 pt-1 mt-4">
                    {
                        events.length ?

                        <LoadMoreEvents data={events} limit={5} isPastEvent={false} showDefaultButton={true} /> :

                        <div className="flex flex-col items-center justify-center mt-12">
                            <div className="text-gray-600 px-6 py-4 rounded-lg bg-inherit w-full">
                                <h2 className="text-sm md:text-xl text-center font-semibold"> No Upcoming Events </h2>
                                <p className="text-xs md:text-sm mt-2 text-center">Stay tuned for exciting updates!</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

