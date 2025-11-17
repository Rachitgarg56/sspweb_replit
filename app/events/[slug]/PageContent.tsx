'use client';

import { useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import Aside from '../../../app/components/Aside';
import styles from './page.module.css';
import Link from 'next/link';
import { formatDate, formatTime } from '../../../utils/formatters';
import BreadCrumbs from '../../../app/components/BreadCrumbs';
import Gallery from '../../../app/components/Gallery';
import Loader from '../../../app/components/Loader';
import { Event } from '@/app/src/types';
import { URL } from '@/config/api';
import SocialShareComponent from '@/app/components/SocialShareComponent';

interface Props {
    params: Promise<{ slug: string }>; 
    eventsData: {
        event: Event,
        upcomingEvents: Event[],
        pastEvents: Event[],
        prevEvent: Event,
        nextEvent: Event,
    }
}

export default function EventPage({ params, eventsData }: Props) {
    const [event, setEvent] = useState<Event | null>(eventsData?.event);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>(eventsData?.upcomingEvents);
    const [pastEvents, setPastEvents] = useState<Event[]>(eventsData?.pastEvents);
    const [prevEvent, setPrevEvent] = useState<Event | null>(eventsData?.prevEvent);
    const [nextEvent, setNextEvent] = useState<Event | null>(eventsData?.nextEvent);
    
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

    if (!event) return (
        <Loader text="events" color="var(--events)"/>
    )
      
    return (
        <section className='p-4 bg-[--gray-100]'>
            <div className='max-w-[1175px] m-auto flex flex-col gap-4'>
            
            <div className='mt-4'>
                <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator}/>
            </div>

                <h1 className='text-center text-4xl mb-5 text-[var(--events)] font-pt-serif'>{isPastEvent ? 'Past Events' : 'Upcoming Events'}</h1>

                <div className='page-main-inner-container w-full flex gap-6 relative max-lg:flex-col pb-14'>
                    <div className='flex flex-col gap-6 w-full'>
                        {/*  */}
                        <div className='bg-[#FFFFFF] pt-4 pb-10 shadow-md flex flex-col gap-6'>
                            <div className={`bg-[--events] w-[200px] text-white py-2 px-3 flex ${isPastEvent ? 'items-center ' : 'items-start '}  gap-2 rounded-tr-sm rounded-br-sm`}>
                                <figure className='flex'>
                                    <FontAwesomeIcon icon={faCalendarPlus} className=" text-[14px]" />
                                </figure>
                                <div>
                                    <h3 className={`${isPastEvent ? "py-1 " : ""}  font-bold text-xs uppercase`}>{formatDate(event?.date)}</h3>
                                    {!isPastEvent && <p className='text-xs font-semibold opacity-75'>{formatTime(event?.date)} IST</p>}
                                </div>
                            </div>
                            <div className='flex flex-col gap-4 px-16 max-sm:px-6 max-[768px]:px-8 max-[375px]:px-4'>
                                {
                                    !isPastEvent ?

                                    <h1 className='font-pt-serif text-[27px] mb-3 text-[var(--brown-dark)] max-sm:text-2xl'>{event?.title}</h1> :
                                    
                                    <header className='flex flex-col gap-1 mb-3'>
                                        <h1 className='text-[27px] text-[var(--brown-dark)] max-sm:text-2xl font-pt-serif'>{event?.title}</h1>
                                        <h2 className='uppercase text-sm text-[var(--events)] font-medium'>Location: <span className='font-bold'>{event?.location}</span></h2>
                                    </header>
                                }
                                
                                {
                                    !isPastEvent ?
                                    
                                    <>
                                        <div className='flex gap-2 rounded-sm max-sm:flex-col'>
                                            <div className={`${!event?.showAccomodation && !event?.showSeva ? 'w-full' : 'w-3/4'} flex flex-col py-3 px-4 bg-[--gray-100] rounded-sm max-sm:w-full`}>
                                                <div className={`h-1/2 border-b-2 border-solid border-[#E8DFD4] pb-2 flex items-center flex-wrap gap-2 sm:gap-6 uppercase `}>
                                                    <div className='flex items-center gap-1'>
                                                        <span className='text-[var(--events)] font-inter text-[9px] font-bold leading-none'>Date:</span>
                                                        <p className='text-[var(--brown-dark)] text-[13px] whitespace-nowrap font-inter font-medium'>{formatDate(event?.date)}</p>
                                                    </div>
                                                    <div className='flex items-center gap-1'>
                                                        <span className='text-[var(--events)] font-inter text-[9px] font-bold leading-none'>Time:</span>
                                                        <p className='text-[var(--brown-dark)] text-[13px] font-inter whitespace-nowrap font-medium'>{formatTime(event?.date)} IST</p>
                                                    </div>
                                                    <div className='flex items-center gap-1'>
                                                        <span className='text-[var(--events)] font-inter text-[9px] font-bold leading-none'>Location:</span>
                                                        <p className='text-[var(--brown-dark)] text-[13px] font-inter whitespace-nowrap font-medium'>{event?.location}</p>
                                                    </div>
                                                </div>
                                                <div className='h-1/2 pt-2 text-[var(--events)] text-[10px] font-inter font-bold flex items-center gap-1'><VideocamOutlinedIcon sx={{ fontSize: '18px' }} />{event?.showLiveStream ? 'LIVE STREAM AVAILABLE DAY OF EVENT' : 'LIVE STREAM NOT AVAILABLE DAY OF EVENT'}</div>
                                            </div>
                                            { (event?.showAccomodation || event?.showSeva) &&
                                                <div className='flex flex-col gap-2 w-1/4 justify-between max-sm:w-full'>
                                                    {event?.showAccomodation && <a href="https://yatri.sringeri.net/" className='text-white h-auto flex justify-center text-[12px] font-inter font-semibold py-3 px-8 rounded-sm bg-[--brown-light] text-nowrap uppercase'>Book Accomodation</a>}
                                                    {event?.showSeva && <a href="https://seva.sringeri.net/" className='text-white h-auto flex justify-center py-3 px-8 rounded-sm bg-[--brown-light] text-nowrap text-[12px] font-inter font-semibold uppercase'>Book Seva</a>}
                                                </div>
                                            }
                                        </div>

                                        {
                                            event?.yTLink &&
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
                                            </div> 
                                        }
                                    
                                        <div dangerouslySetInnerHTML={{ __html: event?.description || "" }} className='text-[var(--brown-dark)] my-[0.8rem] text-[13px] font-inter page-content prose max-w-none'></div>
                                       
                                        <>
                                            {
                                                (event?.images.length > 1) &&
                                                
                                                <Gallery images={event?.images} imagesCaptions={event?.imagesCaptions || []} /> 
                                            }
                                        </> 
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

                                        <div dangerouslySetInnerHTML={{ __html: event?.description || "" }} className='text-[var(--brown-dark)] my-[0.8rem] text-[13px] font-inter page-content prose max-w-none'></div>
                                        
                                        <>
                                            {
                                                (event?.images.length > 1) ?
                                                
                                                <Gallery images={event?.images} imagesCaptions={event?.imagesCaptions || []}/> :

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
                                
                                <SocialShareComponent url={`${URL}events/${event.slug}`} />
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            {
                                prevEvent &&
                                <Link href={`/events/${prevEvent?.slug}`}>
                                    <button id='prev-page-btn' className='flex items-center'>
                                        <NavigateBeforeIcon className='text-[var(--events)]'/>  
                                        <div className='flex font-inter text-[13px] items-center gap-1 max-md:w-20 md:w-64'>
                                            <span className='text-[var(--events)] font-bold max-md:hidden'>Previous:</span> 
                                            <span className='text-[var(--brown-dark)] truncate text-left'> {prevEvent?.title} </span> 
                                        </div>
                                    </button>
                                </Link>
                            }
                            {
                                nextEvent && 
                                <Link href={`/events/${nextEvent?.slug}`}>
                                    <button id='next-page-btn' className='flex items-center'>
                                        <div className='flex font-inter text-[13px] items-center gap-1 max-md:w-20 md:w-64 -mr-2'>
                                            <span className='text-[var(--events)] font-bold max-md:hidden'>Next:</span> 
                                            <span className='text-[var(--brown-dark)] truncate text-right'> {nextEvent?.title} </span>
                                        </div>
                                        <NavigateNextIcon className='text-[var(--events)]'/>
                                    </button>
                                </Link>
                            }
                        </div>
                    </div>
                    {
                        ( isPastEvent && pastEvents.length !== 0 || !isPastEvent && upcomingEvents.length !== 0 ) &&
                        <Aside isPastEvent={isPastEvent} upcomingEvents={upcomingEvents} pastEvents={pastEvents} isDetailsPage={'true'} />
                    }
                </div>
            </div>
        </section>
    );
}
