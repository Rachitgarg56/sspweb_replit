"use client";

import { useRef } from "react";
import { formatDate } from '../../utils/formatters';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DROPDOWN_ICON } from "@/public/assets/svgs/svg";
import { Collection } from "../src/types";

const langs = [
  { short: "sa", full: "Sanskrit",  script: "devanagari" },
  { short: "ta", full: "Tamil", script: "tamil" },
  { short: "kn", full: "Kannada", script: "kannada" },
  { short: "te", full: "Telugu", script: "telugu" },
  { short: "gj", full: "Gujarati", script: "gujarati" },
  { short: "en", full: "Roman Transliteration", script: "iast" },
];

interface AsideProps {
  quickIndexes?: string[];
  indexes?: { title: string, link: string }[];
  lang1?: string;
  lang2?: string;
  setLang1?: (lang: string) => void;
  setLang2?: (lang: string) => void;
  isDetailsPage?: string;
  isStotrasPage?: string;
  isShlokasPage?: string;
  isDeitiesPage?: string;
  upcomingEvents?: UpcomingEvent[];
  pastEvents?: PastEvent[];
  isPastEvent?: Boolean;
  highlight?: string;
  currFocusedDeity?: number;
  collections?: Collection[];
}

interface UpcomingEvent {
  id: string;
  description: string;
  location: string;
  title: string;
  slug: string;
  date: { seconds: number; nanoseconds: number };
  time: string;
  images: string[];
  isOffline: boolean;
  isOnline: boolean;
}

interface PastEvent {
  id: string;
  description: string;
  location: string;
  title: string;
  slug: string;
  date: { seconds: number; nanoseconds: number };
  time: string;
  images: string[];
  isOffline: boolean;
  isOnline: boolean;
}

const Aside: React.FC<AsideProps> = ({
  quickIndexes,
  lang1,
  lang2,
  setLang1,
  setLang2,
  isDetailsPage,
  isStotrasPage,
  isShlokasPage,
  isDeitiesPage,
  upcomingEvents,
  pastEvents,
  isPastEvent,
  indexes,
  highlight,
  currFocusedDeity,
  collections,
}) => {
  const pathname = usePathname();
  const handleQuickIndexClick = (index: number) => {
    const element = document.getElementById('deity-' + index);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const isDetailPage = useRef(isDetailsPage);
  const isStotraPage = useRef(isStotrasPage);
  const isShlokaPage = useRef(isShlokasPage);
  const isDeityPage = useRef(isDeitiesPage);

  return (
    <aside className={`flex flex-col gap-6 ${isDetailPage ? 'lg:max-w-[277px] w-full max-lg:min-w-72' : 'min-w-72'}`}>
      {/* aside for stotras */}
      {isStotraPage.current && (
          <div className="top-0 sticky flex flex-col gap-6">
            {/* Language Selection */}
            <div className="flex flex-col p-6 gap-4 bg-white">
              <h2 className="text-[var(--brown-medium)] text-[17px] font-pt-serif">Shloka Language</h2>
              <div className="relative w-full">
                <select
                  className="custom-dropdown cursor-pointer text-white w-full rounded-[3px] bg-[var(--resources)] px-3 uppercase text-[10.5px] font-semibold font-inter py-2 custom-hover"
                  value={lang1}
                  onChange={(e) => setLang1(e.target.value)}
                  >
                  {langs.map((lang) => (
                    <option key={lang.short} value={lang.script} className="uppercase text-[10.5px] font-inter font-semibold" >
                      {lang.full}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 pointer-events-none text-white top-1/2 -translate-y-1/2 text-[12px]">
                  {DROPDOWN_ICON}
                </div>
              </div>
              {lang2 &&
              <div className="relative w-full">
                <select
                  className="custom-dropdown w-full cursor-pointer text-white rounded-[3px] bg-[var(--resources)] px-3 uppercase text-[10.5px] font-semibold font-inter py-2"
                  value={lang2}
                  onChange={(e) => setLang2(e.target.value)}
                >
                  {langs.map((lang) => (
                    <option key={lang.short} value={lang.script} className="uppercase text-[10.5px] font-inter font-semibold" >
                      {lang.full}
                    </option>
                  ))}
                    <option value={'none'} className="uppercase text-[10.5px] font-inter font-semibold" >
                        {'None--'}
                    </option>
                </select>
                <div className="absolute right-2 pointer-events-none text-white top-1/2 -translate-y-1/2 text-[12px]">
                  {DROPDOWN_ICON}
                </div>
              </div>
              }
            </div>

            {/* Quick Index */}
            {quickIndexes?.length ?
              <div className="bg-white p-6 flex flex-col gap-4 sticky top-0">
                <h2 className="text-[var(--brown-medium)] text-[17px] font-pt-serif">Quick Index</h2>
                <hr />
                <ul className="flex flex-col gap-1 mb-4">
                  {quickIndexes?.map((quickIndex, idx) => {
                    const isActive = currFocusedDeity === idx;
                    return (
                      <li
                        key={quickIndex}
                        onClick={() => handleQuickIndexClick(idx)}
                        className={`${isActive ? `text-[${highlight}]` : 'text-[var(--brown-medium)]'} text-[14px] font-pt-serif cursor-pointer`}
                      >
                        {quickIndex}
                      </li>
                    )
                  })}
                </ul>

                {
                  collections?.length > 0 && 
                  <>
                    <h2 className="text-[var(--brown-medium)] text-[17px] font-pt-serif">Collections</h2>
                    <hr />
                    <ul className="flex flex-col gap-1">
                      {collections?.map((collection, idx) => {
                        const collectionName = collection.title.find(c => c.lang == 'en').value;
                        return (
                          <Link
                            href={'/collection/' + collection.url}
                            key={collection.url}
                            className={`text-[var(--brown-medium)] text-[14px] font-pt-serif cursor-pointer`}
                          >
                            {collectionName}
                          </Link>
                        )
                      })}
                    </ul>
                  </>
                }

              </div> : <></>
            } 
          </div>
      )}

      {
        isShlokaPage.current && (
          <div className="top-0 sticky flex flex-col gap-6">
            {/* Language Selection */}
            <div className="flex flex-col p-6 gap-4 bg-white">
              <h2 className="text-[var(--brown-medium)] font-pt-serif text-[17px]">Shloka Language</h2>
              <div className="relative w-full">
                <select
                  className="custom-dropdown w-full cursor-pointer text-white rounded-[3px] bg-[var(--resources)] px-3 uppercase text-[10.5px] font-semibold font-inter py-2"
                  value={lang1}
                  onChange={(e) => setLang1(e.target.value)}
                >
                  {langs.map((lang) => (
                    <option key={lang.short} value={lang.script} className="uppercase text-[10.5px] font-inter font-semibold" >
                      {lang.full}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 pointer-events-none text-white top-1/2 -translate-y-1/2 text-[12px]">
                  {DROPDOWN_ICON}
                </div>
              </div>
              {lang2 &&
                <div className="relative w-full">
                  <select
                    className="custom-dropdown w-full cursor-pointer text-white rounded-[3px] bg-[var(--resources)] px-3 uppercase text-[10.5px] font-semibold font-inter py-2"
                    value={lang2}
                    onChange={(e) => setLang2(e.target.value)}
                  >
                    {langs.map((lang) => (
                      <option key={lang.short} value={lang.script} className="uppercase text-[10.5px] font-inter font-semibold" >
                        {lang.full}
                      </option>
                    ))}
                      <option value={'none'} className="uppercase text-[10.5px] font-inter font-semibold" >
                        {'None--'}
                      </option>
                  </select>
                  <div className="absolute right-2 pointer-events-none text-white top-1/2 -translate-y-1/2 text-[12px]">
                      {DROPDOWN_ICON}
                  </div>
                </div>
              }
            </div>

            {/* Quick Index */}
            {indexes?.length ?
              <div className="bg-white p-6 flex flex-col gap-6 sticky top-0">
                <h2 className="text-[var(--brown-medium)] text-[17px] font-pt-serif">Quick Index</h2>
                <hr />
                <ul className="flex flex-col gap-1">
                  {indexes?.map((quickIndex, idx) => {
                    const isActive  = pathname === quickIndex.link;
                    return (
                      <Link scroll={false} key={quickIndex.title} href={quickIndex?.link}>
                        <li
                          className={`${isActive ? `text-[${highlight}]` : 'text-[var(--brown-medium)]'} text-[14px] font-pt-serif cursor-pointer`}
                          onMouseEnter={(e)=> {
                            e.currentTarget.style.color = highlight;
                          }}
                          onMouseLeave={(e) => {
                            if (isActive) return;
                            e.currentTarget.style.color = 'var(--brown-medium)';
                          }}
                        >
                          {quickIndex.title}
                        </li>
                      </Link>
                    )
                  })}
                </ul>
              </div> : <></>
            } 
          </div>
        )
      }

      {/* aside for stotras */}
      {isDeityPage.current && (
          <div className="top-0 sticky flex flex-col gap-6">
            {/* Language Selection */}
            <div className="flex flex-col p-6 gap-4 bg-white">
              <h2 className="text-[var(--brown-medium)] text-[17px] font-pt-serif">Shloka Language</h2>
              <div className="relative w-full">
                <select
                  className="custom-dropdown w-full cursor-pointer text-white rounded-[3px] bg-[var(--resources)] px-3 uppercase text-[10.5px] font-semibold font-inter py-2 custom-hover"
                  value={lang1}
                  onChange={(e) => setLang1(e.target.value)}
                >
                  {langs.map((lang) => (
                    <option key={lang.short} value={lang.script} className="uppercase text-[10.5px] font-inter font-semibold" >
                      {lang.full}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 pointer-events-none text-white top-1/2 -translate-y-1/2 text-[12px]">
                  {DROPDOWN_ICON}
                </div>
              </div>
              {lang2 &&
                <div className="relative w-full">
                  <select
                    className="custom-dropdown w-full cursor-pointer text-white rounded-[3px] bg-[var(--resources)] px-3 uppercase text-[10.5px] font-semibold font-inter py-2"
                    value={lang2}
                    onChange={(e) => setLang2(e.target.value)}
                  >
                    {langs.map((lang) => (
                      <option key={lang.short} value={lang.script} className="uppercase text-[10.5px] font-inter font-semibold" >
                        {lang.full}
                      </option>
                    ))}
                      <option value={'none'} className="uppercase text-[10.5px] font-inter font-semibold" >
                          {'None--'}
                      </option>
                  </select>
                  <div className="absolute right-2 pointer-events-none text-white top-1/2 -translate-y-1/2 text-[12px]">
                    {DROPDOWN_ICON}
                  </div>
                </div>
              }
            </div>

            {/* Quick Index */}
            {indexes?.length ?
              <div className="bg-white p-6 flex flex-col gap-6 sticky top-0">
                <h2 className="text-[var(--brown-medium)] text-[17px] font-pt-serif">Quick Index</h2>
                <hr />
                <ul className="flex flex-col gap-1">
                  {indexes?.map((quickIndex, idx) => {
                    const isActive = pathname === quickIndex.link;
                    return (
                    <Link scroll={false} key={quickIndex.title} href={quickIndex?.link}>
                      <li
                        className={`${isActive ? `text-[${highlight}]` : 'text-[var(--brown-medium)]'} text-[14px] font-pt-serif cursor-pointer`}
                        onMouseEnter={(e)=> {
                          e.currentTarget.style.color = highlight;
                        }}
                        onMouseLeave={(e) => {
                          if (isActive) return;
                          e.currentTarget.style.color = 'var(--brown-medium)';
                        }}
                      >
                        {quickIndex.title}
                      </li>
                    </Link>
                  )})}
                </ul>
              </div> : <></>
            } 
          </div>
      )}

      {/* aside for single event detail page */}
      {
        isDetailPage.current &&
          
        <div className='bg-[#FFFFFF] p-6 flex flex-col gap-4 sticky top-0'>
            <h2 className='text-[var(--events)] text-left text-[21px] font-pt-serif'>{!isPastEvent ? 'More Upcoming Events' : 'Recent Events'}</h2>
            <hr className='mb-2' />
            <ul className='flex flex-col gap-7 max-lg:flex-row max-sm:flex-col'>
              
              {
                  !isPastEvent ?

                
                  upcomingEvents?.map((event,idx) => {
                    return (
                      <li key={event.id} className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-2 sm:max-w-[224px]'>
                            <Link href={`/events/${event.slug}`}><img className="sm:max-h-[125px] sm:max-w-[224px] w-full sm:object-cover" src={!event?.images?.length ? "/assets/images/events/event-placeholder.jpg" : `https://files.sringeri.net/${event.images[0]}`} alt="event-image" width={250} height={250}  ></img></Link>
                            <p className='uppercase text-[var(--events)] font-inter text-[9px] font-extrabold'>{formatDate(event?.date)}</p>
                            <h3 className='text-[var(--brown-medium)] text-[14px] font-pt-serif'>{event.title}</h3>
                        </div>
                        <hr className='border-b border-solid border-[#E6DED3]' />
                      </li>
                      )
                  }) :

                  pastEvents?.map((event,idx) => {
                    return (
                      <li key={event.id} className='flex flex-col gap-6'>
                        <div className='flex flex-col gap-2 sm:max-w-[224px]'>
                            <Link href={`/events/${event.slug}`}><img className="sm:max-h-[125px] sm:max-w-[224px] w-full sm:object-cover" src={!event?.images?.length ? "/assets/images/events/event-placeholder.jpg" : `https://files.sringeri.net/${event.images[0]}`} alt="event-image" width={250} height={250}  ></img></Link>
                            <p className='uppercase text-[var(--events)] font-inter text-[9px] font-extrabold'>{formatDate(event?.date)}</p>
                            <h3 className='text-[var(--brown-medium)] text-[14px] font-pt-serif'>{event.title}</h3>
                        </div>
                        <hr className='border-b border-solid border-[#E6DED3]' />
                      </li>
                      )
                  })

              } 
            
              </ul>
              <Link href={isPastEvent ? '/events/past-events' : '/events/upcoming-events'}><button className="uppercase my-4 rounded-[3px] bg-[var(--events)] hover:bg-[var(--events-hover)] py-2 px-4 font-inter text-[8px] md:text-[12px] font-semibold text-white w-full sm:max-w-[225px]">{isPastEvent ? 'view all past events' : 'view all upcoming events '}</button></Link>
        </div> 

      }
    </aside>
  );
};

export default Aside;
