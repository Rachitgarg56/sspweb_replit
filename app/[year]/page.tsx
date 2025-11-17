import BreadCrumbs from "../../app/components/BreadCrumbs";
import { API_URL } from "../../config/api";
import { Event } from "@/app/src/types";
import LoadMoreEvents from "@/app/components/LoadMoreEvents";

interface PageProps {
    params: Promise<{ year: Number }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { year } = await params;
    return {
        title: "Past Events in Sringeri in year" + year,
        description: "Past Events in Sri Sringeri Sharada Peetham in year" + year,
        openGraph: {
            title: "Past Events in Sringeri in year" + year,
            description: "Past Events in Sri Sringeri Sharada Peetham in year" + year,
            images: [
                {
                    url: "/assets/images/events/event-placeholder.jpg",
                    alt: "Past Events in Sringeri in year" + year,
                },
            ],
            type: "website",
        }
    };
}

export default async function PastEvents({ params }: PageProps) {
    const { year } = await params;
    const events: Event[] = await fetch(API_URL + year).then((res) => res.json());

    let breadcrumbs;
    if (year+'' === 'announcement') {
        breadcrumbs = [
            {title: "Home", link: "/"},
            {title: year+'', link: '/' + year, desktopClick: false},
        ]
    } else {
        breadcrumbs = [
            {title: "Home", link: "/"},
            {title: "Events", link: "/events", desktopClick: false},
            {title: year+'', link: '/' + year},
        ]
    }
    const breadcrumbsSeperator = '|';
    
    return (
        <div className="bg-[var(--gray-100)] p-4 sm:p-8 pb-12 md:pb-4 overflow-hidden">
            <div className="max-w-[1175px] mx-auto">
                <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator}/>
                {
                    year+'' === 'announcement' ?
                    <h2 className="text-[var(--events)] text-[20px] md:text-[24px] font-pt-serif pt-4">Announcements</h2> :    
                    <h2 className="text-[var(--events)] text-[20px] md:text-[24px] font-pt-serif pt-4">Events Year: {year+''}</h2>
                }
                <div className="grid grid-cols-1 gap-8 flex-1 pt-1 mt-4">
                    {
                        events.length ?

                        year+'' === 'announcement' ? 

                        <LoadMoreEvents data={events} limit={5} isAnnouncement={true} /> :
                        
                        <LoadMoreEvents data={events} limit={5} isPastEvent={true} /> : 
                        
                        <div className="flex flex-col items-center justify-center mt-12">
                            <div className="text-gray-600 px-6 py-4 rounded-lg bg-inherit w-full">
                                <h2 className="text-xl text-center font-semibold"> No Events Present </h2>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}