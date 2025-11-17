"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { Button } from "./Button"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface GalleryProps {
  images: string[];
  imagesCaptions?: string[];
}

export default function Gallery({ images, imagesCaptions }: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModal = useCallback((index: number) => {
    setCurrentImageIndex(index)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const showPrevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }, [images.length])

  const showNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }, [images.length])

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-inner-container')) {
      setIsOpen(false);
    }
  }

  let touchstartX, touchendX;

  const handleSwipe = () => {
    if (touchendX > touchstartX) {
      showPrevImage();
    } else if (touchendX < touchstartX) {
      showNextImage();
    }
  }

  const handleSwipeStart = (e) => {
    touchstartX = e.changedTouches[0].screenX;
  }

  const handleSwipeEnd = (e) => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipe();
  }

    // Handle keyboard events for arrow keys
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (isOpen) {
          if (event.key === "ArrowLeft") {
            showPrevImage();
          } else if (event.key === "ArrowRight") {
            showNextImage();
          } else if (event.key === "Escape") {
            closeModal();
          }
        }
      };
  
      window.addEventListener("keydown", handleKeyDown);
  
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, showPrevImage, showNextImage, closeModal]);

    // Prevent background scroll when modal is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12">
        {images.map((src, index) => (
          <div
            key={index}
            className="overflow-hidden"
            onClick={() => openModal(index)}
          >
            <img
              src={'https://files.sringeri.net/'+ src || "/placeholder.svg"}
              alt={`Gallery image ${index + 1}`}
              width={300}
              height={300}
              className="object-cover aspect-square w-full cursor-pointer rounded"
            />
            {
              (imagesCaptions && imagesCaptions[index]) &&
              <p className="line-clamp-2 font-inter italic text-[11px] text-[var(--brown-light)] mt-1">{imagesCaptions[index]}</p>
            }
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 backdrop-blur-sm">
          <div onClick={(e)=>handleOutsideClick(e)} className="modal-inner-container relative w-full h-full flex items-center justify-center">
            <div className="relative w-fit h-fit max-w-4xl max-h-[90vh]">
              <div className="h-full w-fit flex flex-col items-center justify-center">
                <img
                  onTouchStart={((e) => handleSwipeStart(e))}
                  onTouchEnd={((e) => handleSwipeEnd(e))}
                  src={'https://files.sringeri.net/'+images[currentImageIndex] || "/placeholder.svg"}
                  alt={`Full size image ${currentImageIndex + 1}`}
                  // fill="none"
                  className="object-contain max-h-[90vh]"
                />

                <button
                  onClick={showPrevImage}
                  className="absolute lg:hidden left-0 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-tr rounded-br py-2 px-1 pl-[2px]"
                  aria-label="Previous image"
                >
                  <ArrowBackIosIcon sx={{transform: 'translateX(2px)', display: 'flex', justifyContent: 'center', alignItems: 'center', '@media (max-width: 425px)':{fontSize:'18px'}}} />
                </button>

                <button
                  onClick={showNextImage}
                  className="absolute lg:hidden right-0 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-tl rounded-bl py-2 px-1"
                  aria-label="Next image"
                >
                  <ArrowForwardIosIcon sx={{transform: 'translateX(2px)', display: 'flex', justifyContent: 'center', alignItems: 'center', '@media (max-width: 425px)':{fontSize:'18px'}}} />
                </button>
              </div>
              {
                (imagesCaptions && imagesCaptions[currentImageIndex]) && 
                <p className="p-4 sm:p-0 sm:mt-4 text-white text-xs">{imagesCaptions[currentImageIndex]}</p>
              } 
            </div>

            <button
              onClick={showPrevImage}
              className="absolute hidden lg:block left-8 xl:left-36 top-1/2 -translate-y-1/2 text-white"
              aria-label="Previous image"
            >
              <ArrowBackIosIcon/>
            </button>

            <button
              onClick={showNextImage}
              className="absolute hidden lg:block right-8 xl:right-36 top-1/2 -translate-y-1/2 text-white"
              aria-label="Next image"
            >
              <ArrowForwardIosIcon />
            </button>

            <button
                className="absolute top-3 right-3 sm:right-4 sm:text-xl sm:font-semibold text-white z-10 leading-none self-center"
                onClick={closeModal}
                aria-label="Close modal"
              >
                &#x2715;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

