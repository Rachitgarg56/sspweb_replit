'use client'

import React, { useEffect, useRef, useState } from "react";
import { API_URL } from "@/config/api";
import { Event, Occasion } from "../src/types";
import { formatDate, formatTime } from "@/utils/formatters";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type CalendarCell = {
  date: number | null;
  events: Event[];
  occasions: Occasion[];
};

const Calendar = () => {
  const [calendarMatrix, setCalendarMatrix] = useState<CalendarCell[][]>(
    Array.from({ length: 6 }, () =>
      Array.from({ length: 7 }, () => ({ date: null, events: [], occasions: [] }))
    )
  );

  const [calendarData, setCalendarData] = useState<{
    currentYear: number | null;
    currentMonth: string;
    daysInMonth: number | null;
    firstDayNumeric: number | null;
    currentMonthIndex: number | null;
  }>({
    currentYear: null,
    currentMonth: "",
    daysInMonth: null,
    firstDayNumeric: null,
    currentMonthIndex: null,
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);

  const [selectedDateData, setSelectedDateData] = useState<{
    date: number | null;
    events: Event[];
    weekday: string;
  }>({
    date: null,
    events: [],
    weekday: "",
  });

  const [tithi, setTithi] = useState({
    todayDetails: '',
    todayWebsiteKannada: '',
    todayWebsiteEnglish: '',
    occasion: '',
    occasionK: '',
  });

  const scrollToRef = useRef(null);

  const handlePrevMonth = () => {
    setCalendarData((prev) => {
      let newMonth = prev.currentMonthIndex - 1;
      let newYear = prev.currentYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }

      const { currentYear, currentMonth, daysInMonth, firstDayNumeric } =
        getCalendarData(newYear, newMonth);
      return {
        currentYear,
        currentMonth,
        daysInMonth,
        firstDayNumeric,
        currentMonthIndex: newMonth,
      };
    });
  };

  const handleNextMonth = () => {
    setCalendarData((prev) => {
      let newMonth = prev.currentMonthIndex + 1;
      let newYear = prev.currentYear;

      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }

      const { currentYear, currentMonth, daysInMonth, firstDayNumeric } =
        getCalendarData(newYear, newMonth);
      return {
        currentYear,
        currentMonth,
        daysInMonth,
        firstDayNumeric,
        currentMonthIndex: newMonth,
      };
    });
  };

  function getCalendarData(year?: number, monthIndex?: number) {
    // Fallback to current date if year or monthIndex is not passed or invalid
    const currentDate = new Date();
    const finalYear = year ?? currentDate.getFullYear(); // Use provided year or current year
    const finalMonthIndex =
      monthIndex !== undefined ? monthIndex : currentDate.getMonth(); // Use provided monthIndex or current month index

    // current month
    const currentMonth = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(new Date(finalYear, finalMonthIndex));

    // number of days in the current month
    const daysInMonth = new Date(finalYear, finalMonthIndex + 1, 0).getDate();

    // weekday on 1st of current month
    const firstDayOfMonth = new Date(finalYear, finalMonthIndex, 1).getDay();

    // weekday on 1st of current month (whole number)
    const firstDayNumeric = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;

    // current month index
    const currentMonthIndex = finalMonthIndex;

    return {
      currentYear: finalYear,
      currentMonth,
      daysInMonth,
      firstDayNumeric,
      currentMonthIndex,
    };
  }

  async function getEvents() {
    try {
      const res = await fetch(`${API_URL}events`);
      const parsedRes = await res.json();
      setEvents(parsedRes);
    } catch (err) {
      console.error(err);
    }
  }

  async function getOccasions() {
    try {
      const res = await fetch(`https://dssp.lcpl.in/api/calendar/occasions`);
      const parsedRes = await res.json();
      setOccasions(parsedRes);
    } catch (err) {
      console.error(err);
    }
  }

  function getSelectedDateEvents(
    date: number,
    events: Event[],
    weekdayIdx: number
  ) {
    const weekday = weekdays[weekdayIdx];

    setSelectedDateData({
      date,
      events,
      weekday,
    });
  }

  function isToday(date: number) {
    return (
      new Date().getDate() === date &&
      new Date().toLocaleString("en-US", { month: "long" }) ===
        calendarData.currentMonth &&
      new Date().getFullYear() === calendarData.currentYear
    );
  }

  useEffect(() => {
    async function fetchData() {
      await getEvents();
      await getOccasions();
      const {
        currentYear,
        currentMonth,
        daysInMonth,
        firstDayNumeric,
        currentMonthIndex,
      } = getCalendarData();
      setCalendarData({
        currentYear,
        currentMonth,
        daysInMonth,
        firstDayNumeric,
        currentMonthIndex,
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    const matrix: CalendarCell[][] = Array.from({ length: 6 }, () =>
      Array.from({ length: 7 }, () => ({ date: null, events: [], occasions: [] }))
    );

    let d = 1;

    while (d <= calendarData?.daysInMonth) {
      for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[0].length; c++) {
          if (d > calendarData?.daysInMonth) {
            break;
          } else if (r === 0 && c < calendarData?.firstDayNumeric - 1) {
            continue;
          } else {
            const eventsForDate = events.filter((event) => {
              const eventDate = new Date(event?.date?.seconds * 1000);
              return (
                eventDate.getUTCDate() === d &&
                eventDate.getMonth() === calendarData?.currentMonthIndex &&
                eventDate.getFullYear() === calendarData?.currentYear
              );
            });

            const occasionsForDate = occasions.filter((occasion) => {
              const occasionDate = new Date(occasion.date);
              return (
                occasionDate.getUTCDate() === d &&
                occasionDate.getMonth() === calendarData?.currentMonthIndex &&
                occasionDate.getFullYear() === calendarData?.currentYear
              );
            });

            matrix[r][c] = { date: d, events: eventsForDate, occasions: occasionsForDate };
            d++;
          }
        }
      }
    }
    setCalendarMatrix(matrix);
  }, [calendarData]);

  return (
    <>
      <div className="calendar page-main-inner-container flex gap-4 relative flex-col">
        <div className="flex items-center justify-center w-full h-16 sm:px-4 text-[var(--events)]">
          <div className="flex items-center justify-between w-full max-w-[340px]">
            <button
              onClick={handlePrevMonth}
              className="p-2 text-2xl hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeftIcon fontSize="large" className="w-6 h-6" />
            </button>
            <h2 className="text-4xl max-sm:text-3xl font-medium font-pt-serif">
              {calendarData?.currentMonth} {calendarData?.currentYear}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-2 text-2xl hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Next month"
            >
              <ChevronRightIcon fontSize="large" className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-6 max-sm:gap-4">
          {weekdays.map((day, idx) => {
            return (
              <div
                key={day}
                className={`${
                  idx === 5 || idx === 6
                    ? "text-[var(--events)]"
                    : "text-[var(--events)]"
                } uppercase text-center font-semibold`}
              >
                <span className="block md:hidden text-[13px] font-inter sm:font-bold">{day.slice(0, 3)}</span>
                <span className="hidden md:block text-[13px] font-inter sm:font-bold">{day}</span>
              </div>
            );
          })}
        </div>

        {/* <hr className="border-2 border-solid border-gray-300" /> */}

        <div className="grid grid-cols-7 gap-6 max-[768px]:gap-2 max-[767px]:gap-1">
          {calendarMatrix.map((row) => {
            return row.map((col, colIdx) => {
              return (
                // <Link href={'#events-details'} key={uuidv4()}>
                  <CalendarCellComponent key={uuidv4()} col={col} colIdx={colIdx} isToday={isToday} getSelectedDateEvents={getSelectedDateEvents} setSelectedDateData={setSelectedDateData} selectedDateData={selectedDateData} setTithi={setTithi} calendarData={calendarData} scrollToRef={scrollToRef} />
                // </Link>
              );
            });
          })}
        </div>
      </div>

      {/* {((selectedDateData.events.length > 0) || (tithi.todayWebsiteKannada || tithi.todayWebsiteEnglish)) && ( */}
        <div ref={scrollToRef} id="events-details" className="">
          {
            ((tithi?.todayWebsiteKannada?.trim() !== '' || tithi?.todayWebsiteEnglish?.trim() !== '') && (tithi?.todayWebsiteKannada !== 'Not Available' || tithi?.todayWebsiteEnglish !== 'Not Available')) &&
            <div className="mb-8">
              <h2 className="font-pt-serif text-[--brown-dark] max-sm:text-[14px] text-[22px] font-semibold">
                Panchangam for{" "}
                {selectedDateData?.weekday.slice(0, 3) +
                  ", " +
                  selectedDateData?.date +
                  " " +
                  calendarData?.currentMonth +
                  " " +
                  calendarData?.currentYear}
              </h2>
              <hr className="my-2 border-b-0 border-solid border-[#EBE0D3]" />
              <h2 className="font-pt-serif text-[#443D32]  max-sm:text-[13px] text-[21px] mb-2">{tithi?.todayWebsiteEnglish}</h2>
              <h2 className="max-sm:text-[13px] text-[#443D32]  text-[21px] font-noto-sans">{tithi?.todayWebsiteKannada}</h2>
            </div>
          }
          {
            ((tithi?.occasion?.trim() !== '' || tithi?.occasionK?.trim() !== '') && (tithi?.occasion !== null || tithi?.occasionK !== null)) &&
            <div className="mb-8">
              <h2 className="font-pt-serif text-[--brown-dark] max-sm:text-[14px] text-[22px] font-semibold">
                Occasion for{" "}
                {selectedDateData?.weekday.slice(0, 3) +
                  ", " +
                  selectedDateData?.date +
                  " " +
                  calendarData?.currentMonth +
                  " " +
                  calendarData?.currentYear}
              </h2>
              <hr className="my-2 border-b-0 border-solid border-[#EBE0D3]" />
              <h2 className="font-pt-serif text-[#443D32]  max-sm:text-[13px] text-[21px] mb-2">{tithi?.occasion}</h2>
              <h2 className="max-sm:text-[13px] text-[#443D32]  text-[21px] font-noto-sans">{tithi?.occasionK}</h2>
            </div>
          }
          {
            selectedDateData?.events?.length > 0 &&
           
            <>
              <h2 className="font-pt-serif text-[--brown-dark] max-sm:text-[14px] text-[22px] font-semibold">
                Events for{" "}
                {selectedDateData?.weekday.slice(0, 3) +
                  ", " +
                  selectedDateData?.date +
                  " " +
                  calendarData?.currentMonth +
                  " " +
                  calendarData?.currentYear}
              </h2>
              <hr className="my-2 border-b-0 border-solid border-[#EBE0D3]" />
              {selectedDateData.events.map((event, idx) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    <div className="flex gap-4 items-start">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                          <h3 className="mb-1 font-pt-serif text-[#443D32] max-sm:text-[15px] text-[21px]">
                            {event?.title}
                          </h3>
                          {/* <p className="text-[--brown-medium] tracking-[0.24px] uppercase font-inter max-sm:text-[9px] font-bold">{formatDate(event?.date)}</p> */}
                          {/* <p className="font-pt-serif text-[--brown-medium] max-sm:text-[13px] text-[21px]">{formatTime(event?.date)}</p> */}
                        </div>
                        <p
                          dangerouslySetInnerHTML={{ __html: event?.description }}
                          className="text-[#443D32] text-[13px] line-clamp-3 font-inter max-sm:text-[10px]"
                        ></p>
                      </div>
                      <img
                        src={
                          !event?.images?.length
                            ? "/assets/images/events/event-placeholder.jpg"
                            : `https://files.sringeri.net/${event.images[0]}`
                        }
                        alt="image"
                        className="max-w-[100px] max-h-[70px]"
                      />
                    </div>
                    <button className="uppercase my-4 self-start text-white bg-[var(--brown-light)] hover:bg-[var(--events)] rounded-[3px] py-2 px-3 font-inter text-xs"><Link href={`/events/${event?.slug}`}>Event Details</Link></button>
                    {idx < selectedDateData.events.length - 1 && (
                      <hr className="my-4 border-b-0 border-solid border-[#EBE0D3]" />
                    )}
                  </React.Fragment>
                );
              })}
            </> 
          }
        </div>
      {/* )} */}

    </>
  );
};

export default Calendar;

const CalendarCellComponent = ({ col, colIdx, isToday, getSelectedDateEvents, setSelectedDateData, selectedDateData, setTithi, calendarData, scrollToRef }) => {
  function getDate(date) {
    const formattedDate = `${calendarData.currentYear}-${String(calendarData.currentMonthIndex + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    return formattedDate;
  }

  async function getTithi(date) {
    const res = await fetch("https://dssp.lcpl.in/api/todayDetails/" + getDate(date))
    const parsedRes = await res.json()
    setTithi(parsedRes);
  }

  function resetTithi() {
    setTithi({
      todayDetails: '',
      todayWebsiteKannada: '',
      todayWebsiteEnglish: '',
      occasion: '',
      occasionK: '',
    })
  }

  function resetSelectedDateEvents() {
    setSelectedDateData({
      date: null,
      events: [],
      weekday: "",
    })
  }

  function handleClick() {
    if (col.date) {
      getTithi(col.date)
      getSelectedDateEvents(col?.date, col?.events, colIdx)
      scrollToRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {    
      resetTithi()
      resetSelectedDateEvents()
    }
  }

  return (
    <div
      onClick={handleClick}
      
      className={`${
        selectedDateData?.date !== null &&
        col?.date !== null &&
        selectedDateData.date === col?.date &&
        "bg-[#A9D6A0] "
      } ${col?.events.length > 0 && "bg-white "} ${
        !col?.events.length &&
        !isToday(col?.date) &&
        "bg-white "
      } ${isToday(col?.date) && "bg-[#F4E1C9] "} ${
        !col?.date ? "bg-[#E5E5E5] " : "cursor-pointer "
      } flex flex-col justify-between drop-shadow-[#00000017] shadow-[0px_3px_4px_#00000017] text-[var(--brown-dark)] min-h-40 max-lg:min-h-32 max-md:min-h-24 max-sm:min-h-16 max-[425px]:min-h-12 max-w-40 w-full h-full text-center rounded-md p-2 font-pt-serif max-md:p-0`}
    >
      <span
        className={`
          ${(col?.events?.length <= 0 && col?.occasions?.length <= 0 && !isToday(col?.date)) ? ' text-[#EBE3D9] ' : ' text-[var(--events)] '} 
          text-[27px] font-inter font-semibold self-end mx-3 mt-1 max-[1000px]:flex-1 max-[1000px]:flex max-[1000px]:items-center max-[1000px]:self-center max-[1000px]:m-0 max-md:text-xl`}
      >
        {col?.date}
      </span>

      <>
        <div className="relative flex flex-col text-[12px] max-[1000px]:hidden max-[1000px]:mt-0 mt-2 min-[1001px]:block h-full">
          { 
            (col?.events?.length > 0) &&
            <>
              <li className="line-clamp-2 text-[#4B3729] font-inter pointer-events-auto font-medium">
                {col.events[0]?.title}
              </li>

              {
                (col?.events?.length > 1) &&
                <span className="absolute bottom-1 right-1 text-[var(--events)] text-[11px] font-inter font-bold">{`+${col?.events.length-1} more`}</span>
              }
            </>
          }

          {
            (col?.events?.length == 0 && col?.occasions?.length > 0) &&
            <li className="line-clamp-2 text-[#4B3729] font-inter pointer-events-auto font-medium">
              {col.occasions[0]?.occasion}
            </li>
          }

          {/* <ul className="list-disc list-inside"> */}
            {/* {col?.events?.map((event, idx) => {
              return (
                <React.Fragment key={uuidv4()}>
                    <li className="truncate text-[#4B3729] font-inter pointer-events-auto font-medium">
                      {event?.title}
                    </li>
                  {idx < col?.events.length - 1 && (
                    <hr className="border border-gray-200 my-1" />
                  )}
                </React.Fragment>
              );
            })} */}
      
            {/* {
              (col?.events?.length > 0 && col?.occasions?.length > 0) && 
              <hr className="border border-gray-200 my-1" />
            } */}
      
            {/* {col?.occasions?.map((occasion, idx) => {
              return (
                <React.Fragment key={uuidv4()}>
                    <li className="truncate text-[#4B3729] font-inter pointer-events-auto font-medium">
                      {occasion?.occasion}
                    </li>
                  {idx < col?.occasions.length - 1 && (
                    <hr className="border border-gray-200 my-1" />
                  )}
                </React.Fragment>
              );
            })} */}
          {/* </ul> */}
        </div>

        <div className="block min-[1001px]:hidden max-[1000px]:flex-1 max-[1000px]:flex max-[1000px]:items-center max-[1000px]:justify-center">
          {((col?.events?.length > 0) || col?.occasions?.length > 0) && (
            <span className="w-2 h-2 rounded-full bg-[var(--events)]"></span>
          )}
        </div>
      </>
    </div>
  )
}
