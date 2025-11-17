"use client"

import type { Announcement, AnnouncementsSectionProps } from "../src/types"
import { useState, useCallback, useEffect, useRef } from "react"
import Link from "next/link"
import './AnnouncementsSection.css'

const ITEMS_PER_PAGE = 4
const CARD_WIDTH = 300 // in pixels

function formatDate(dateString) {
  const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];

  const [year, month, day] = dateString.split("-");

  return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
}

const AnnouncementsSection = ({ announcements }: AnnouncementsSectionProps) => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalAnnouncements = announcements.length

  const scrollToIndex = useCallback((index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: index * CARD_WIDTH,
        behavior: "smooth",
      })
    }
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % totalAnnouncements
      scrollToIndex(nextIndex)
      return nextIndex
    })
  }, [totalAnnouncements, scrollToIndex])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex - 1 + totalAnnouncements) % totalAnnouncements
      scrollToIndex(nextIndex)
      return nextIndex
    })
  }, [totalAnnouncements, scrollToIndex])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrev()
      } else if (event.key === "ArrowRight") {
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [goToNext, goToPrev])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let startX: number
    let scrollLeft: number

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].pageX - container.offsetLeft
      scrollLeft = container.scrollLeft
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!startX) return
      const x = e.touches[0].pageX - container.offsetLeft
      const walk = (x - startX) * 2
      container.scrollLeft = scrollLeft - walk
    }

    const handleScroll = () => {
      const index = Math.round(container.scrollLeft / CARD_WIDTH)
      setCurrentIndex(index)
    }

    container.addEventListener("touchstart", handleTouchStart)
    container.addEventListener("touchmove", handleTouchMove)
    container.addEventListener("scroll", handleScroll)

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="bg-[var(--gray-100)] max-sm:pb-8 pb-20">
      <div className="max-w-[1300px] mx-auto">
        <h1 className="text-[#FF6B35] md:text-[37px] text-3xl font-pt-serif pt-12 pb-4 max-sm:text-[20px] sm:pl-[3.9rem] max-sm:p-4">Announcements</h1>

        <div className="flex items-center sm:gap-4">
          <button
            onClick={goToPrev}
            className="w-10 h-10 -mt-8 flex-shrink-0 flex items-center justify-center focus:outline-none hover:opacity-75 transition-opacity"
            aria-label="Previous announcement"
          >
            <div className="text-[#B4A597] opacity-60">
              <svg className="text-[30px]" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"></path></svg>
            </div>
          </button>

          <div
            ref={containerRef}
            className=" flex-1 overflow-x-auto overflow-y-hidden announcements-scrollbar pb-8 announcements-scrollbar"
            style={{ scrollSnapType: "x mandatory" }}
          >

            <div className="flex gap-12 p-2" style={{ width: `${CARD_WIDTH * totalAnnouncements}px` }}>
              {announcements.map((announcement, index) => (
                <div key={index} className="shadow-md max-sm:max-h-[212px] bg-white h-80 p-6 flex flex-col justify-between max-w-[300px] w-full">
                  <div className="flex flex-col max-sm:gap-3 gap-4">
                    <p className="font-inter max-sm:text-[9px] text-[11px] text-[var(--pilgrim)] font-semibold uppercase sm:mb-2">{formatDate(announcement?.date)}</p>
                    <h2 className="font-pt-serif max-sm:text-[13px] text-[17px] max-sm:line-clamp-2 leading-[21px] text-[#443D32]">{announcement?.title}</h2>
                    <p dangerouslySetInnerHTML={{__html: announcement?.description}} className="font-inter max-sm:text-[10px] text-[13px] text-[#443D32] max-sm:line-clamp-3 line-clamp-4"></p>
                  </div>
                  <Link href={'/announcement/' + announcement?.slug}>
                    <button
                      className="uppercase font-medium text-white bg-[var(--brown-light)] hover:bg-[var(--pilgrim)] rounded-[3px] max-sm:text-[8px] text-[10.5px] max-sm:py-1 max-sm:px-2 py-2 px-3 font-inter self-start"
                      >
                      Learn More
                    </button>
                    </Link>
              </div>
              ))}
            </div>
          </div>

          <button
            onClick={goToNext}
            className="w-10 h-10 -mt-8 flex-shrink-0 flex items-center justify-center focus:outline-none hover:opacity-75 transition-opacity"
            aria-label="Next announcement"
          >
            <div className="text-[#B4A597] opacity-60">
              <svg className="text-[30px]" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"></path></svg>
            </div>
          </button>
        </div>

      </div>

    </div>
  )
}

export default AnnouncementsSection

