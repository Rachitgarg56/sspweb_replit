import BreadCrumbs from "../../../app/components/BreadCrumbs";
import Link from "next/link";
import { formatDate, formatTime } from '../../../utils/formatters';
import { API_URL } from "../../../config/api";

interface Event {
    slug: string;
    id: string;
    title: string;
    date: {
        seconds: number;
        nanoseconds: number;
    };
    time: string;
    description: string;
    images: [];
    isOnline: boolean;
    isOffline: boolean;
}

async function UpcomingEvents() {
    const events: Event[] = await fetch(API_URL + "events/upcoming-events").then((res) => res.json());

    let breadcrumbs = [
        { title: "Home", link: "/" },
        { title: "Events", link: "/events" },
        { title: "Upcoming Events", link: "/events/upcoming-events" },
    ]
    const breadcrumbsSeperator = '|';

    return (
        <div>
            {/* featured events */}
            <div className="bg-[var(--gray-100)] p-8 md:pl-40 md:pr-32 pb-12 md:pb-4">
                <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator} />
                <div className="grid grid-cols-1 gap-8 flex-1 pt-1">
                    {
                        events.length ?
                        events.map((event) => {
                            return (
                                <div className="min-h-60 bg-white shadow-lg flex flex-col-reverse md:flex-row transform translate-y-12" key={event.title}>
                                    <div className="md:w-1/2">
                                        {/* Display formatted date and time */}
                                        <p className="bg-[var(--pilgrim)] w-1/3 text-white mt-4 p-2 text-xs font-semibold uppercase">
                                            {formatDate(event?.date)} <br /> {formatTime(event?.date) + ' IST'}
                                        </p>
                                        <div className="px-8 py-6">
                                            <p className="text-[10px] font-semibold uppercase text-[var(--events)]">Online + Offline</p>
                                            <h2 className="capitalize font-pt-serif py-4 text-2xl text-gray-800">{event.title}</h2>
                                            <p dangerouslySetInnerHTML={{ __html: event?.description }} className="line-clamp-3 text-xs mb-5 page-content prose"></p>
                                            <Link href={`/events/${event.slug}`} className="uppercase text-white bg-[var(--brown-light)] hover:bg-[var(--events)] rounded-sm text-[8px] py-2 px-3 font-inter">Event Details</Link>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2">
                                        {/* <img
                                            src={!event?.images?.length ? "/public/assets/images/events/event-placeholder.jpg" : `https://files.sringeri.net/${event.images[0]}`}
                                            // src="/assets/images/events/event-placeholder.jpg"
                                            // src={`https://files.sringeri.net/${event.images[0]}`}  
                                            alt={event.title}
                                            className="md:w-full max-h-72"
                                        /> */}
                                    </div>
                                </div>
                            )
                        }) :
                        <div className="flex flex-col items-center justify-center mt-12">
                            <div className="text-gray-600 px-6 py-4 rounded-lg bg-inherit w-full">
                                <h2 className="text-xl text-center font-semibold"> No Upcoming Events </h2>
                                <p className="text-sm mt-2 text-center">Stay tuned for exciting updates!</p>
                            </div>
                        </div>
                    }
                </div>

                <div className="flex justify-center items-center pt-11 uppercase md:pb-8 mt-14">
                    <Link href="/events/past-events" className="text-white bg-[var(--events)] text-xs px-10 py-2 font-inter rounded-sm">View Past Events</Link>
                </div>
            </div>
        </div>
    )
}

export default UpcomingEvents