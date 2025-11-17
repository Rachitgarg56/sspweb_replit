'use client'
import React, { useState } from 'react'
import EventCardNew from './EventCardNew'
import Link from 'next/link';

const LoadMoreEvents = ({ data, limit = 5, isPastEvent=false, isAnnouncement=false, showDefaultButton = false }) => {
    const [dataLimit, setDataLimit] = useState(limit);
    const [showLoadMore, setShowLoadMore] = useState(data.length >= limit);

    function handleClick() {   
        if (dataLimit+limit >= data.length) setShowLoadMore(false)
        setDataLimit(prev => prev+limit)
    }

    return (
        <>
            {data
            .slice(0,dataLimit)
            .map((event) => {
                return (
                    <EventCardNew key={event?.id} isAnnouncement={isAnnouncement} isPastEvent={isPastEvent} eventData={event} />
                )
            })}
            <div className="flex justify-center items-center pt-0 md:pb-14 mt-1 md:mt-14">
                {
                    showLoadMore ?

                    <button onClick={handleClick} className="text-white bg-[var(--events)] text-[8px] md:text-[12px] px-10 py-2 font-inter rounded-[3px] font-semibold uppercase">{isAnnouncement ? 'Show More Announcements' : 'Show More Events'}</button> :

                    (showDefaultButton && 
                    <Link href={isPastEvent ? `/events/upcoming-events` : `/events/past-events`} className="text-white bg-[var(--events)] text-[8px] md:text-[12px] px-10 py-2 font-inter rounded-sm uppercase">{isPastEvent ? `View Upcoming Events` : `View Past Events`}</Link>) 
                }
            </div>
        </>
    )
}

export default LoadMoreEvents
