'use client';

import { use, useEffect, useRef, useState } from 'react';
import SocialIcons from '../upcoming-events/SocialIcons';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EventNoteIcon from '@mui/icons-material/EventNote';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import Aside from '../../../app/components/Aside';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import { formatDate, formatTime } from '../../../utils/formatters';
import BreadCrumbs from '../../../app/components/BreadCrumbs';
import Gallery from '../../../app/components/Gallery';
import Loader from '../../../app/components/Loader';
import { API_URL } from "../../../config/api";

interface Event {
    id: string;
    title: string;
    date: {
        seconds: number;
        nanoseconds: number;
    };
    time: string;
    location: string;
    description: string;
    images: string[];
    yTLink: string;
    slug: string;
    isOffline: boolean;
}

interface Props {
    params: Promise<{ slug: string }>; 
}


export default function EventPage({ params }: Props) {
    const { slug } = use(params); 
    
    const [event, setEvent] = useState<Event | null>(null);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [pastEvents, setPastEvents] = useState<Event[]>([]);
    const [prevEvent, setPrevEvent] = useState<Event | null>(null);
    const [nextEvent, setNextEvent] = useState<Event | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    
    const breadcrumbsSeperator = '|';

    const eventDate = event?.date?.seconds ? new Date(event.date.seconds * 1000) : null;
    const currentDate = new Date();
    const isPastEvent = eventDate ? eventDate < currentDate : false;

    let breadcrumbs = [
        { title: "Home", link: "/" },
        { title: "Events", link: "/events", desktopClick: false },
        {
            title: isPastEvent ? "Past Events" : "Upcoming Events",
            link: isPastEvent ? "/events/past-events" : "/events/upcoming-events",
        },
        { title: event?.title, link: `/events/${event?.slug}` },
    ];

    const videoId = event?.yTLink;

    useEffect(() => {
        async function fetchEvent() {
            try {
                const res = await fetch(`${API_URL}events/${slug}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch event details");
                }
                const data = await res.json();
                // console.log('previousEvent:', data.prevEvent);
                // console.log('nextEvent:', data.nextEvent);
                await setEvent(data.event);
                setUpcomingEvents(data.upcomingEvents);
                setPastEvents(data.pastEvents);
                // setPrevEvent(data.prevEvent);
                // setNextEvent(data.nextEvent);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchEvent();
    }, [slug]);

    if (loading) return (
        // <div className="flex items-center justify-center min-h-[200px]">
        //   <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[var(--events)] border-opacity-75"></div>
        //   <span className="ml-3 text-gray-600 text-lg font-medium">Loading events...</span>
        // </div>
        <Loader text="events" color="var(--events)"/>
    );
      
    if (error) return <p>Error: {error}</p>;

    return (
        <section className='p-4 bg-[--gray-100]'>
            <div className='max-w-[1175px] m-auto flex flex-col gap-4'>
            
            <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator}/>

                <h1 className='text-center text-4xl mb-5 text-[var(--events)]'>{isPastEvent ? 'Past Events' : 'Upcoming Events'}</h1>

                <div className='page-main-inner-container flex gap-6 relative max-lg:flex-col pb-14'>
                    <div className='flex flex-col gap-6 w-full'>
                        {/*  */}
                        <div className='bg-[#FFFFFF] pt-4 pb-10 shadow-md flex flex-col gap-6'>
                            <div className={`bg-[--events] w-[200px] text-white py-2 px-3 flex ${isPastEvent ? 'items-center ' : 'items-start '}  gap-2 rounded-tr-sm rounded-br-sm`}>
                                <figure className='flex'>
                                    <EventNoteIcon fontSize="medium"/>
                                </figure>
                                <div>
                                    <h3 className={`${isPastEvent ? "py-1 " : ""}  font-bold text-xs uppercase`}>{formatDate(event?.date)}</h3>
                                    {!isPastEvent && <p className='text-xs font-semibold opacity-75'>{formatTime(event?.date)} IST</p>}
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 px-16 max-sm:px-6 max-[768px]:px-8 max-[375px]:px-4'>
                                {
                                    !isPastEvent ?

                                    <h1 className='font-semibold text-2xl mb-3 text-[var(--brown-medium)] max-sm:text-2xl'>{event?.title}</h1> :
                                    
                                    <header className='flex flex-col gap-1 mb-3'>
                                        <h1 className='font-semibold text-2xl text-[var(--brown-medium)] max-sm:text-2xl'>{event?.title}</h1>
                                        <h2 className='uppercase text-sm text-[var(--events)] font-medium'>Location: <span className='font-bold'>{event?.location}</span></h2>
                                    </header>
                                }
                                
                                {
                                    !isPastEvent ?
                                    
                                    <>
                                        <div className='flex gap-2 rounded-sm max-sm:flex-col'>
                                            <div className='w-3/4 flex flex-col py-3 px-4 bg-[--gray-100] rounded-sm max-sm:w-full'>
                                                <div className={`h-1/2 border-b-2 border-solid border-[#E8DFD4] pb-2 flex items-center gap-6 uppercase ${styles.datetimelocation}`}>
                                                    <div className='flex items-center gap-1 font-semibold'>
                                                        <span className='text-[var(--events)] text-[10px] font-bold self-end'>Date:</span>
                                                        <p className='text-[var(--brown-medium)] text-sm font-bold'>{formatDate(event?.date)}</p>
                                                    </div>
                                                    <div className='flex items-center gap-1 font-semibold'>
                                                        <span className='text-[var(--events)] text-[10px] font-bold self-end'>Time:</span>
                                                        <p className='text-[var(--brown-medium)] text-sm font-bold'>{formatTime(event?.date)} IST</p>
                                                    </div>
                                                    <div className='flex items-center gap-1 font-semibold'>
                                                        <span className='text-[var(--events)] text-[10px] font-bold self-end'>Location:</span>
                                                        <p className='text-[var(--brown-medium)] text-sm font-bold'>{event?.location}</p>
                                                    </div>
                                                </div>
                                                <div className='h-1/2 pt-2 text-[var(--events)] text-[10px] font-bold flex items-center gap-1'><VideocamOutlinedIcon/>LIVE STREAM AVAILABLE DAY OF EVENT</div>
                                            </div>
                                            <div className='flex flex-col gap-2 w-1/4 justify-between max-sm:w-full'>
                                                <a href="#" className='text-white h-auto flex justify-center text-xs py-3 px-8 rounded-sm bg-[--brown-light] text-nowrap font-semibold uppercase'>Book Accordation</a>
                                                <a href="#" className='text-white h-auto flex justify-center text-xs py-3 px-8 rounded-sm bg-[--brown-light] text-nowrap font-semibold uppercase'>Book Seva</a>
                                            </div>
                                        </div>
                                    
                                        <div dangerouslySetInnerHTML={{ __html: event?.description || "" }} className='text-[var(--brown-medium)] my-[0.8rem] text-sm font-semibold page-content prose'></div>
                                       
                                        <img src={!event?.images?.length ? "/public/assets/images/events/event-placeholder.jpg" : `https://files.sringeri.net/${event.images[0]}`} alt="image" className='border border-solid border-black h-[420px] object-cover max-sm:h-[250px]' />
                                    </> :
                                    
                                    <>
                                        {
                                            event?.yTLink ?
                                            <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
                                                <div className="relative w-full pb-[56.25%]">
                                                    <iframe
                                                    className="absolute top-0 left-0 w-full h-full"
                                                    src={`https://www.youtube.com/embed/${videoId}`}
                                                    title="YouTube Video"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    ></iframe>
                                                </div>
                                            </div> :
                                            <img
                                            src={!event?.images?.length ? "/assets/images/events/event-placeholder.jpg" : `https://files.sringeri.net/${event.images[0]}`}  
                                                alt={event?.title}
                                            />
                                        }

                                        <div dangerouslySetInnerHTML={{ __html: event?.description || "" }} className='text-[var(--brown-medium)] my-[0.8rem] text-sm font-semibold page-content prose'></div>
                                        
                                        <>
                                            {
                                                (event?.images.length > 2) ?
                                                
                                                <Gallery images={event?.images}/> :

                                                event?.yTLink ?
                                                
                                                event?.images?.map((image: string, index: number) => (
                                                    <img
                                                        key={index}
                                                        src={`https://files.sringeri.net/${image}`}
                                                        // layout="responsive"
                                                        alt={`Event Image ${index + 1}`}
                                                        width={1000}
                                                        height={500}
                                                        className="rounded-sm object-cover"
                                                    />
                                                )) :

                                                event?.images?.slice(1).map((image: string, index: number) => (
                                                    <img
                                                        key={index}
                                                        src={`https://files.sringeri.net/${image}`}
                                                        // layout="responsive"
                                                        alt={`Event Image ${index + 1}`}
                                                        width={1000}
                                                        height={500}
                                                        className="rounded-sm object-cover"
                                                    />
                                                ))
                                            }
                                        </> 
                                    </>
                                }
                                
                                <div className='flex items-center justify-center text-[#B7A99C] mt-4'>
                                    <div className='pr-6 py-1 h-full font-semibold text-sm flex items-center'>SHARE</div>
                                    <SocialIcons/>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            {
                                prevEvent &&
                                <Link href={`/events/${prevEvent?.slug}`}>
                                    <button id='prev-page-btn' className='flex items-center'>
                                        <NavigateBeforeIcon className='text-[#E3930E]'/>  
                                        <div className='flex items-center gap-1 mb-[2px] max-md:w-20 md:w-64'>
                                            <span className='text-[var(--events)] font-bold text-sm max-md:hidden'>Previous:</span> 
                                            <span className='text-sm text-[var(--brown-medium)] font-semibold truncate text-left'> {prevEvent?.title} </span> 
                                        </div>
                                    </button>
                                </Link>
                            }
                            {
                                nextEvent && 
                                <Link href={`/events/${nextEvent?.slug}`}>
                                    <button id='next-page-btn' className='flex items-center'>
                                        <div className='flex items-center gap-1 mb-[2px] max-md:w-20 md:w-64'>
                                            <span className='text-[var(--events)] font-bold text-sm max-md:hidden'>Next:</span> 
                                            <span className='text-sm text-[var(--brown-medium)] font-semibold truncate text-right'> {nextEvent?.title} </span>
                                        </div>
                                        <NavigateNextIcon className='text-[#E3930E]'/>
                                    </button>
                                </Link>
                            }
                        </div>
                    </div>
                    {/* {
                        ( isPastEvent && pastEvents.length !== 0 || !isPastEvent && upcomingEvents.length !== 0 ) &&
                        <Aside isPastEvent={isPastEvent} upcomingEvents={upcomingEvents} pastEvents={pastEvents} isDetailsPage={'true'} />
                    } */}
                </div>
            </div>
        </section>
    );
}
