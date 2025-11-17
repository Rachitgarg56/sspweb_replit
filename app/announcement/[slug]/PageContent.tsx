'use client';

import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { formatDate } from '../../../utils/formatters';
import BreadCrumbs from '../../components/BreadCrumbs';
import { v4 as uuidv4 } from 'uuid';
import { use, useState } from 'react';
import Loader from '../../components/Loader';
import { Announcement } from '@/app/src/types';
import { URL } from '@/config/api';
import SocialShareComponent from '@/app/components/SocialShareComponent';

interface Props {
    params: Promise<{ slug: string }>; 
    announcementsData: {
        announcement: Announcement,
        announcements: Announcement[],
    }
}

const PageContent = ({ params, announcementsData }: Props) => {
    const { slug } = use(params); 

    const { announcement, announcements } = announcementsData;
    
    const [currIndex, setCurrentIndex] = useState(0);

    const breadcrumbsSeperator = '|';

    let breadcrumbs = [
        { title: "Home", link: "/" },
        { title: "Announcement", link: "/announcement", desktopClick: false },
        { title: announcement?.title, link: `/events/${announcement?.slug}` },
    ];

    if (!announcement) return (
        <Loader text="announcement" color="var(--events)"/>
    );

    function handleImageControllerClick(idx) {
        setCurrentIndex(idx);
    }

    return (
        <section className='p-4 bg-[--gray-100]'>
            
            <div className='max-w-[1175px] m-auto flex flex-col gap-4'>
            
            <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator}/>

                <h1 className='text-center text-4xl mb-5 text-[var(--events)] font-pt-serif'>Announcement</h1>

                <div className='page-main-inner-container flex gap-6 relative max-lg:flex-col pb-14'>
                    
                    <div className='flex flex-col gap-6 w-full'>
                        
                        <div className='bg-[#FFFFFF] pt-4 pb-10 shadow-md flex flex-col gap-6'>
                            
                            <div className={`bg-[--events] w-[200px] text-white py-2 px-3 flex items-start gap-2 rounded-tr-sm rounded-br-sm`}>
                                <figure className='flex items-center justify-center'>
                                    {/* <EventNoteIcon fontSize="medium"/> */}
                                    <FontAwesomeIcon icon={faCalendarPlus} className='text-[14px] pt-1' />
                                </figure>
                                <div>
                                    <h3 className={`${true ? "py-1 " : ""}  font-bold text-xs uppercase`}>{formatDate(announcement?.date)}</h3>
                                </div>
                            </div>

                            <div className='flex flex-col gap-4 px-16 max-sm:px-6 max-[768px]:px-8 max-[375px]:px-4'>
                                
                                <h1 className='text-[27px] font-pt-serif text-[var(--brown-dark)] max-sm:text-2xl mb-2'>{announcement?.title}</h1>          
                                
                                <div className='relative'>
                                    {
                                        (announcement?.images?.length > 0) &&
                                        <img src={`https://files.sringeri.net/${announcement.images[currIndex]}`} alt="announcement-image" className='' />
                                    }
                                    {
                                        (announcement.images.length > 1) &&

                                        <div className='absolute left-2/4 -translate-x-1/2 bottom-12 md:bottom-8 text-white flex items-center gap-2 md:gap-4'>
                                            {announcement.images.map((sl,idx) => 
                                                <button
                                                key={uuidv4()}
                                                onClick={() => handleImageControllerClick(idx)}
                                                className={`w-6 md:w-10 h-1.5 md:h-2 rounded-full border-2 border-solid border-gray-500 ${currIndex === idx ? 'bg-[var(--pilgrim)]' : 'bg-[var(--gray-100)]'}`}
                                                ></button>
                                            )}
                                        </div>
                                    }
                                </div>

                                {
                                    announcement?.description?.length > 0 &&
                                    <div dangerouslySetInnerHTML={{ __html: announcement?.description || "" }} className='text-[var(--brown-dark)] font-inter page-content prose my-[0.8rem] text-[13px] max-w-none'></div>
                                }

                                {
                                    announcement?.attachments.length > 0 && 
                                    <>
                                        {/* <div className='grid grid-cols-1 sm:gap-6 sm:grid-cols-3 sm:hidden hidden'>
                                            {announcement?.attachments?.map(attachment => {
                                                return (
                                                    <Link key={uuidv4()} target="_blank" href={`https://files.sringeri.net/${attachment}`}>
                                                        <button className="uppercase my-2 rounded-[3px] bg-[var(--events)] hover:bg-[var(--events-hover)] py-2 px-4 font-inter text-[8px] md:text-[12px] font-semibold text-white w-full">{'Download'}</button>
                                                    </Link>
                                                )
                                            })}
                                        </div> */}
                                        
                                        <div className='flex flex-col gap-6 max-sm:gap-2'>
                                            {announcement?.attachments?.map(attachment => {
                                                return (
                                                    <div key={uuidv4()} className='flex flex-col'>
                                                        {/* <div className=" w-full aspect-[8/11] sm:aspect-[8/11]">
                                                            <embed src={`https://files.sringeri.net/${attachment}#toolbar=0&navpanes=0`} className="w-full h-full" />
                                                        </div> */}
                                                       <iframe
                                                        src={`https://docs.google.com/gview?url=https://files.sringeri.net/${attachment}&embedded=true`}
                                                        className="w-full aspect-[8/11]"
                                                        frameBorder="0"
                                                        />

                                                        <Link target="_blank" href={`https://files.sringeri.net/${attachment}`}>
                                                            <button className="uppercase my-4 rounded-[3px] bg-[var(--events)] hover:bg-[var(--events-hover)] py-2 px-4 font-inter text-[8px] md:text-[12px] font-semibold text-white w-full">{'Download'}</button>
                                                        </Link>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                    
                                }      
                                    
                                <SocialShareComponent url={`${URL}announcement/${announcement?.slug}`} />
                            </div>
                        </div>
                    </div>
            

                    {/* Aside */}
                    <aside className="flex flex-col gap-6 lg:max-w-[277px]">
                        <div className='bg-[#FFFFFF] p-6 flex flex-col gap-4 sticky top-0'>
                            <h2 className='text-[var(--events)] text-center text-[21px] font-pt-serif'>Latest Announcements</h2>
                            <hr className='mb-2' />
                            <ul className='flex flex-col gap-7 max-lg:flex-row max-sm:flex-col'>
                
                                {
                                    announcements
                                    ?.filter(a => a?.id !== announcement?.id)
                                    ?.slice(0,2)
                                    ?.map((currAnnouncement) => {
                                        return (
                                            <li key={uuidv4()} className='flex flex-col gap-6'>
                                                <Link href={`/announcement/${currAnnouncement.slug}`}>
                                                    <div className='flex flex-col gap-2'>                                                    
                                                        <img className='max-sm:w-full mb-2' src={!currAnnouncement?.images?.length ? "/assets/images/events/event-placeholder.jpg" : `https://files.sringeri.net/${currAnnouncement.images[0]}`} alt="announcement-image" width={250} height={250}  ></img>                                                    
                                                        <p className='uppercase text-[var(--events)] font-inter text-[9px] font-extrabold'>{formatDate(currAnnouncement?.date)}</p>
                                                        <h3 className='text-[var(--brown-medium)] text-[14px] font-pt-serif'>{currAnnouncement.title}</h3>
                                                    </div>
                                                </Link>
                                                <hr className='border-b border-solid border-[#E6DED3]' />
                                            </li>
                                        )
                                    }) 
                                }
                            
                            </ul>
                            <Link href={'/announcement'}><button className="uppercase my-4 rounded-[3px] bg-[var(--events)] hover:bg-[var(--events-hover)] py-2 px-4 font-inter text-[8px] md:text-[12px] font-semibold text-white w-full sm:max-w-[225px]">{'view all announcements'}</button></Link>
                        </div> 
                    </aside>

                </div>
            </div>
        </section>
    )
}

export default PageContent