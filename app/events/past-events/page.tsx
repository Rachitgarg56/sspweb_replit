import BreadCrumbs from "../../../app/components/BreadCrumbs";
import { API_URL } from "../../../config/api";
import { Event } from "@/app/src/types";
import LoadMoreEvents from "@/app/components/LoadMoreEvents";

export async function generateMetadata() {
  return {
      title: "Past Events in Sringeri",
      description: "Past Events in Sri Sringeri Sharada Peetham",
      openGraph: {
          title: "Past Events in Sringeri",
          description: "Past Events in Sri Sringeri Sharada Peetham",
          images: [
              {
                  url: "/assets/images/events/event-placeholder.jpg",
                  alt: "Past Events in Sringeri",
              },
          ],
          type: "website",
      }
  };
}

export default async function PastEvents({
    searchParams
  }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
    const params = await searchParams
    const showDrafts = 'showDrafts' in params
    const queryParam = showDrafts ? '?showDrafts' : ''
    const events: Event[] = await fetch(API_URL + `events/past-events${queryParam}`).then((res) => res.json());

    let breadcrumbs = [
      {title: "Home", link: "/"},
      {title: "Events", link: "/events", desktopClick: false},
      {title: "Past Events", link: "/events/past-events"},
    ]
    const breadcrumbsSeperator = '|';
    
    return (
        <div className="bg-[var(--gray-100)] p-4 sm:p-8 pb-12 md:pb-4 overflow-hidden">
            <div className="max-w-[1175px] mx-auto">
                <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator}/>
                <h2 className="text-[var(--events)] text-[20px] md:text-[24px] font-pt-serif pt-4">Past Events</h2>
                <div className="grid grid-cols-1 gap-8 flex-1 pt-1 mt-4">
                    {
                        events.length ?
                        
                        <LoadMoreEvents data={events} limit={5} isPastEvent={true} showDefaultButton={true} /> : 
                        
                        <div className="flex flex-col items-center justify-center mt-12">
                            <div className="text-gray-600 px-6 py-4 rounded-lg bg-inherit w-full">
                                <h2 className="text-xl text-center font-semibold"> No Past Events </h2>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}