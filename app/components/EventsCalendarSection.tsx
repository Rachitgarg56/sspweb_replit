'use client'

import React, { useState } from 'react'
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EventCardNew from "./EventCardNew";
import Link from "next/link";
import Calendar from "./Calendar";
import { Event } from '../src/types';

interface Props {
    events: Event[];
}

const EventsCalendarSection = ({ events }: Props) => {
    const [view, setView] = useState('list-view')

    return (
        <section className="bg-[var(--gray-100)] py-12 px-4 max-sm:py-8 overflow-hidden">
            <div className="max-w-[1175px] w-full mx-auto flex flex-col gap-8">
                <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-4">
                    <h2 className="md:text-[37px] sm:text-2xl max-sm:text-[20px] max-sm:self-start text-[var(--events)] text-left font-pt-serif whitespace-nowrap">
                        Event Calendar
                    </h2>
                    <div className="flex items-center gap-8 max-sm:self-start">
                        <button onClick={()=>setView('list-view')} className={`flex gap-2 text-[10px] border-b-2 ${(view === 'list-view') ? 'border-[var(--pilgrim)] text-[#443D32] opacity-90' : 'text-[var(--brown-medium)] opacity-50 border-transparent'} whitespace-nowrap hover:border-[var(--pilgrim)] uppercase hover:text-[#443D32] font-semibold pb-1 px-1`}>
                            {" "}
                            <FormatListBulletedIcon sx={{ fontSize: 16 }} />{" "}
                            <span className="font-inter text-[11px]">List View</span>
                        </button>
                        <button onClick={()=>setView('calendar-view')} className={`flex gap-2 text-[10px] border-b-2 ${(view === 'calendar-view') ? 'border-[var(--pilgrim)] text-[#443D32] opacity-90' : 'text-[var(--brown-medium)] opacity-50 border-transparent'} whitespace-nowrap hover:border-[var(--pilgrim)] uppercase hover:text-[#443D32] font-semibold pb-1 px-1`}>
                            {" "}
                            <CalendarTodayIcon sx={{ fontSize: 16 }} />{" "}
                            <span className="font-inter text-[11px]">Calendar View</span>
                        </button>
                    </div>
                </div>

                { (view === 'calendar-view') && <Calendar/> }
                 
                { (view === 'list-view') &&
        
                    <div className="flex flex-col gap-6 md:gap-8">
                        <div className="flex flex-col gap-6">
                        {events.slice(0, 3).map((event, index) => {
                            return <EventCardNew key={event?.id} isPastEvent={true} eventData={event} />;
                        })}
                        </div>

                        <div className="flex justify-between md:mt-3">
                            <button className="uppercase self-start text-white bg-[var(--events)] hover:bg-[var(--events-hover)] font-semibold rounded-[3px] py-2 md:py-3 px-8 md:px-14 font-inter text-[8px] md:text-[12px] mx-auto">
                                <Link href="/events/past-events">view all events</Link>
                            </button>
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}

export default EventsCalendarSection