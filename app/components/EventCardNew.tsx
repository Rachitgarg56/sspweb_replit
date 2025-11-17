import Link from 'next/link'
import React from 'react'
import { Event } from '../src/types';
import { formatDate, formatTime } from "@/utils/formatters";
import EventNoteIcon from '@mui/icons-material/EventNote';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";
import EventShareDropDown from './EventShareDropDown';
import { URL } from '@/config/api';

interface EventCardNewProps {
  eventData: Event;
  isPastEvent: boolean;
  isAnnouncement?: boolean;
}

function EventCardNew({ eventData, isPastEvent, isAnnouncement }: EventCardNewProps) {
  return (
    <div className='flex md:h-[335px] max-md:flex-col-reverse mb-2 bg-white shadow-lg'>
      <div className='relative flex-1 max-h-[335px]'>
        {
          <EventShareDropDown title={eventData.title} url={isAnnouncement ? `${URL}announcement/${eventData.slug}` : `${URL}events/${eventData.slug}`} />
        }

        <div className={`bg-[var(--events)] max-md:hidden max-sm:h-[40px] z-50 max-sm:w-[170px] w-[200px] flex gap-2 text-white mt-4 p-2 text-xs font-semibold uppercase rounded-tr-sm rounded-br-sm ${isPastEvent && 'py-3'}`}>
          {/* <EventNoteIcon sx={{fontSize: {
            xs: '12px',
          }}} /> */}
          <FontAwesomeIcon icon={faCalendarPlus} />
          <div className='tracking-[0.24px] font-inter max-sm:text-[9px]' style={!isPastEvent ? {height: '40px'} : {} }>
            <p className='font-bold'>{formatDate(eventData?.date)}</p>
            {!isPastEvent && !isAnnouncement &&
              <p className='font-medium'>{formatTime(eventData?.date) + ' IST'}</p>
              }
          </div>
        </div>

        <div className=' flex flex-col py-4 px-8 justify-between h-[80%] mt-4 md:mt-0'>
          <div className='flex flex-col gap-2'>
            {
              isPastEvent ?
              <div className='uppercase text-[var(--events)] max-sm:text-[9px] font-inter text-[11px] font-bold hidden'>offline</div> :
              <div className='uppercase text-[var(--events)] max-sm:text-[9px] font-inter text-[11px] font-bold hidden'>
                {eventData?.isOnline ? 'online' : ''}
                {(eventData?.isOnline && eventData.isOffline) ? ' + ' : ''}
                {eventData?.isOffline ? 'offline' : ''}
              </div>
            }
            <div className='flex flex-col gap-4'>
              <p className='text-[#443D32] max-sm:text-[15px] text-[21px] line-clamp-2 max-w-[425px] font-pt-serif'>{eventData?.title}</p>
              <p dangerouslySetInnerHTML={{__html: eventData?.description}} className='text-[#443D32] text-[13px] line-clamp-3 font-inter max-sm:text-[10px]'></p>
            </div>
          </div>
          <button className="uppercase font-medium my-4 self-start text-white bg-[var(--brown-light)] hover:bg-[var(--events)] rounded-[3px] max-sm:py-1 max-sm:px-2 py-2 px-3 font-inter max-sm:text-[8px] max-sm:h-[21px] sm:text-[10.5px] hidden sm:block"><Link href={isAnnouncement ? `/announcement/${eventData?.slug}` : `/events/${eventData?.slug}`}>{isAnnouncement ? 'Announcement Details' : 'Event Details'}</Link></button>
          <button className="uppercase font-medium my-4 self-start text-white bg-[var(--brown-light)] hover:bg-[var(--events)] rounded-[3px] max-sm:py-1 max-sm:px-2 py-2 px-3 font-inter max-sm:text-[8px] max-sm:h-[21px] sm:text-[10.5px] block sm:hidden"><Link href={isAnnouncement ? `/announcement/${eventData?.slug}` : `/events/${eventData?.slug}`}>{'Learn More'}</Link></button>
        </div>
      </div>

      <figure style={{backgroundImage: "url('/assets/images/event-image-background-final.jpg')"}} className='relative flex-1 bg-center bg-cover bg-no-repeat'>
        <img className='h-full w-full object-scale-down  bg-none opacity-100' src={!eventData?.images?.length ? "/assets/images/events/event-placeholder.jpg" : `https://files.sringeri.net/${eventData.images[0]}`}  alt="Event Image"></img>
        <div className={`absolute left-0 -bottom-[20px] bg-[var(--events)] max-sm:h-[40px] z-50 max-sm:w-[170px] w-[200px] flex gap-2 text-white mt-4 p-2 text-xs font-semibold uppercase md:hidden rounded-tr-sm rounded-br-sm ${isPastEvent && 'py-3'}`}>
          {/* <EventNoteIcon sx={{fontSize: {
            xs: '12px',
          }}} /> */}
          <FontAwesomeIcon icon={faCalendarPlus} />
          <div className='tracking-[0.24px] font-inter max-sm:text-[9px]' style={!isPastEvent ? {height: '40px'} : {} }>
            <p style={!isPastEvent ? {lineHeight:1} : {}} className='font-bold'>{formatDate(eventData?.date)}</p>
            {!isPastEvent && !isAnnouncement &&
              <p className='font-medium'>{formatTime(eventData?.date) + ' IST'}</p>
              }
          </div>
        </div>
      </figure>
    </div>
  )
}

export default EventCardNew