"use client"

import { useEffect, useRef } from "react"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import XIcon from '@mui/icons-material/X';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { formatDate } from "../../utils/formatters";

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    selectedCourse: Course | null
    prevCourse: Course | null
    nextCourse: Course | null
    setCurrCourseIdx: React.Dispatch<React.SetStateAction<number>>,
}

interface Course {
  id: string
  title: string
  description: string
  videoId: string
  language: { short: string; full: string }
  createdAt: { seconds: number; nanoseconds: number };
  liveFrom: { seconds: number; nanoseconds: number };
  videoRuntime: { hours: number; minutes: number };
  slug: string;
}

export function Modal({ prevCourse , nextCourse, selectedCourse, isOpen, onClose, setCurrCourseIdx }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    const handleClickOutside = (e: MouseEvent) => {
      window.history.pushState({},"",'/anugraha-bhashanams');
      if (overlayRef.current === e.target) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("click", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("click", handleClickOutside)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-auto"
      aria-hidden="true"
    >
      <div
        role="dialog"
        aria-modal="true"
        className="bg-white rounded-lg w-full max-w-[935px] mt-[20vh] animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center p-6 gap-6 overflow-y-auto max-[425px]:mt-0 max-[425px]:p-2"
      >
        {/* Video Preview Section */}
        <div className="relative w-full overflow-hidden shadow-lg rounded-sm">
            <div className="relative w-full pb-[56.25%]">
                <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedCourse?.videoId}`}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
            </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4 w-full">
          <div className="flex justify-between mb-12 max-md:flex-col max-md:mb-0 max-md:gap-4">

            <div className="flex flex-col gap-6 max-w-[550px] max-md:gap-4">
                <span className="text-[10px] font-inter font-bold tracking-wide text-[var(--resources)] uppercase">Uploaded on: {formatDate(selectedCourse?.liveFrom)}</span>

                <h2 className="text-[21px] text-[#443D32] font-pt-serif leading-tight">{selectedCourse?.title}</h2>

                <p className="text-[#443D32] text-[13px] font-inter leading-relaxed page-content xprose" dangerouslySetInnerHTML={{__html: selectedCourse?.description || ""}} />
                {/* className="page-content xprose about mx-auto lg:px-40"  */}
            </div>

            <div className="flex flex-col justify-between gap-2 min-w-[250px]">
                <div className="flex flex-col py-3 px-4 border border-solid border-inherit rounded-md">
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-inter font-bold text-[var(--resources)] uppercase">Run Time:</span>
                        <span className="text-[var(--brown-medium)] text-[13px] font-inter leading-relaxed font-medium">
                          {String(selectedCourse?.videoRuntime?.hours).padStart(2, '0')} hr :{" "}
                          {String(selectedCourse?.videoRuntime?.minutes).padStart(2, '0')} min
                        </span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-inter font-bold text-[var(--resources)] uppercase">Language:</span>
                        <span className="text-[var(--brown-medium)] text-[13px] font-inter leading-relaxed font-medium">{selectedCourse?.language?.full}</span>
                    </div>
                </div>
                {/* <div className="flex text-[var(--brown-light)] items-center border border-solid border-inherit py-3 px-4 gap-4 rounded-md">
                    <span className="text-xs font-bold uppercase">Share</span>
                    <WhatsAppIcon fontSize="small" className="cursor-pointer" />
                    <FacebookRoundedIcon fontSize="small" className="cursor-pointer" />
                    <XIcon fontSize="small" className="cursor-pointer" />
                    <EmailOutlinedIcon fontSize="small" className="cursor-pointer" />
                    <ContentCopyRoundedIcon fontSize="small" className="cursor-pointer" />
                </div> */}
            </div>

            {/* <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button> */}

          </div>

          <hr />

          <div className="flex justify-between">
            <button className="flex items-center max-w-[250px] gap-2 text-[#93836e]" onClick={()=>{
                setCurrCourseIdx(prev => prev-1)
              }}>
              <svg className="w-6 h-6 text-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-[11px] font-inter max-sm:max-w-[100px] max-w-[200px] truncate font-medium">{prevCourse?.title}</span>
            </button>

            <button className="flex items-center max-w-[250px] gap-2 text-[#93836e]" onClick={()=>{
              setCurrCourseIdx(prev => prev+1)
            }}>
              <span className="text-[11px] font-inter max-sm:max-w-[100px] max-w-[200px] truncate font-medium">{nextCourse?.title}</span>
              <svg className="w-6 h-6 text-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}