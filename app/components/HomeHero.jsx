'use client'

import { React, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { navLinks } from './NavLinks';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InfoIcon from '@mui/icons-material/Info';

const HomeHero = ( { heroSlidesData, ytData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Create extended array for infinite loop (add first slide at the end)
  const extendedSlides = heroSlidesData?.length > 0 ? [
    ...heroSlidesData,
    heroSlidesData[0] // First slide at the end
  ] : [];

  // Auto-advance slides with infinite loop handling
  useEffect(() => {
    if (ytData.isLive || isPaused || heroSlidesData?.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 4500);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, heroSlidesData?.length, ytData.isLive]);

  // Handle infinite loop transitions
  useEffect(() => {
    if (heroSlidesData?.length <= 1) return;

    // When we reach the duplicate first slide at the end
    if (currentIndex === heroSlidesData.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0); // Jump to real first slide
        const restoreTimer = setTimeout(() => setIsTransitioning(true), 50);
        return () => clearTimeout(restoreTimer);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, heroSlidesData?.length]);

  // Get the actual slide index for caption display
  const getActualSlideIndex = () => {
    if (heroSlidesData?.length <= 1) return 0;
    if (currentIndex === heroSlidesData.length) return 0; // When at duplicate first slide
    return currentIndex;
  };

//   function handleImageControllerClick(idx) {
//     setCurrentIndex(idx);
//   }

  function handlePrevSlide() {
    if (heroSlidesData?.length <= 1) return;
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        // If we're at the first slide, go to the last slide
        return heroSlidesData.length - 1;
      }
      return prevIndex - 1;
    });
  }

  function handleNextSlide() {
    if (heroSlidesData?.length <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % extendedSlides.length);
  }

  function togglePause() {
    setIsPaused(!isPaused);
  }

  function toggleCaption() {
    setShowCaption(!showCaption);
  }

  return (
    <section
        className={`relative ${ytData?.isLive && 'border border-solid border-transparent px-4 md:pt-8'}`}
        // style={heroSlidesData?.length > 0 ? { backgroundImage: "url('../assets/images/backgound-temple-orange-web.jpg')" } : {}}
      >
        {
            ytData?.isLive && 

            <>
                <div className="relative max-w-4xl overflow-hidden shadow-lg max-sm:w-full mx-auto my-12">
                    <div className="relative w-full pb-[56.25%]">
                        <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${ytData?.videoId}`}
                        title="YouTube Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </>
        }

        {
            (heroSlidesData?.length > 0 && !ytData?.isLive) &&
        
            <>
                <div className='relative outer-container max-w-screen w-full overflow-hidden scrollbar-none'>

                    <div 
                      className={`inner-container flex ${isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`} 
                      style={{ 
                        width: `${extendedSlides.length * 100}vw`, 
                        transform: `translateX(-${currentIndex * 100}vw)` 
                      }}
                    >
                        
                        {
                            extendedSlides
                            ?.map((img, index) => {
                                const isContentLeftAlign = img.alignContent == 'left';
                                return (
                                    <div key={`${img.id || index}-${uuidv4()}`} className="relative w-screen" style={{ paddingTop: `${41.25/extendedSlides?.length}%` }}> 
                                        <div 
                                            style={{ backgroundImage: `url(${'https://files.sringeri.net/' + img.path})` }} 
                                            className={`absolute inset-0 bg-cover bg-center bg-no-repeat flex items-center text-left ${isContentLeftAlign ? 'justify-start' : 'md:justify-end'}`}
                                        >
                                    
                                            <div className={`text-white w-2/3 md:w-1/4 ml-8 sm:ml-4 ${isContentLeftAlign ? 'md:ml-12' : 'md:mr-12 md:ml-0'}`}>
                                        
                                                <h1 className="max-sm:text-lg max-[350px]:text-[16px] text-[37px] sm:leading-[48px] mb-2 md:mb-6 text-white font-pt-serif">
                                                    {img?.title}
                                                </h1>
                                        
                                                {img?.link && 
                                                <Link href={img?.link}>
                                                    <button className="text-xs max-sm:text-[8px] max-sm:px-2 max-sm:py-1 px-4 py-3 bg-[var(--pilgrim)] text-white font-inter
                                                     font-semibold rounded-[3px] hover:bg-[var(--pilgrim)] transition duration-200 uppercase">
                                                        Learn More
                                                    </button>
                                                </Link>}
                                        
                                            </div>
                                
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>

                    {/* Navigation Controls */}
                    {heroSlidesData?.length > 1 && (
                      <>
                        <div className="absolute top-1/2 -translate-y-1/2 ">
                            <button
                                disabled={currentIndex == 0}
                                onClick={handlePrevSlide}
                                className="text-white p-2 md:p-3 rounded-full transition-all left-0 duration-200"
                                aria-label="Previous slide"
                            >
                                <ArrowBackIosIcon className="text-white" style={{ fontSize: '20px' }} />
                            </button>
                        </div>

                        <div className="absolute top-1/2 -translate-y-1/2 right-0 md:right-0">
                            <button
                                disabled={currentIndex == extendedSlides.length-1}
                                onClick={handleNextSlide}
                                className="text-white p-2 md:p-3 rounded-full transition-all duration-200"
                                aria-label="Next slide"
                            >
                                <ArrowForwardIosIcon className="text-white" style={{ fontSize: '20px' }} />
                            </button>
                        </div>

                        {/* Mobile Controls Container */}
                        <div className="absolute bottom-4 right-4 md:hidden flex items-center gap-2">
                            {/* Caption Text */}
                            {showCaption && heroSlidesData[getActualSlideIndex()]?.caption && (
                                <p className="text-xs text-white  px-2 py-1 rounded max-w-[200px] truncate">
                                    {heroSlidesData[getActualSlideIndex()]?.caption}
                                </p>
                            )}
                            
                            {/* Info Icon - Only show if current slide has caption */}
                            {heroSlidesData[getActualSlideIndex()]?.caption && (
                                <button
                                    onClick={toggleCaption}
                                    className={`p-1 ${showCaption ? 'text-red-400' : 'text-white'}`}
                                    aria-label="Show caption"
                                >
                                    <InfoIcon style={{ fontSize: '16px' }} />
                                </button>
                            )}
                          
                            {/* Pause/Resume Button */}
                            <button
                                onClick={togglePause}
                                className="text-white p-1 transition-all duration-200"
                                aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
                            >
                                {isPaused ? (
                                    <PlayArrowIcon style={{ fontSize: '20px' }} />
                                ) : (
                                    <PauseIcon style={{ fontSize: '20px' }} />
                                )}
                            </button>
                        </div>

                        {/* Desktop Pause/Resume Button */}
                        <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 hidden md:block">
                            {/* <button
                                onClick={handlePrevSlide}
                                className="text-white  rounded-full transition-all left-0 duration-200"
                                aria-label="Previous slide"
                            >
                                <ArrowBackIosIcon className="text-white" style={{ fontSize: '20px' }} />
                            </button> */}
                            <button
                                onClick={togglePause}
                                className="text-white p-2 md:p-3 rounded-full transition-all duration-200"
                                aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
                            >
                                {isPaused ? (
                                    <PlayArrowIcon className="text-white" style={{ fontSize: '20px' }} />
                                ) : (
                                    <PauseIcon className="text-white" style={{ fontSize: '20px' }} />
                                )}
                            </button>
                             {/* <button
                                onClick={handleNextSlide}
                                className="text-white  rounded-full transition-all duration-200"
                                aria-label="Next slide"
                            >
                                <ArrowForwardIosIcon className="text-white" style={{ fontSize: '20px' }} />
                            </button> */}
                        </div>
                      </>
                    )}

                   

                   
                    {/* <div className='absolute left-2/4 -translate-x-1/2 bottom-2 md:bottom-8 text-white flex items-center gap-2 md:gap-4'>
                        {heroSlidesData.map((sl,idx) => 
                        <button
                            key={uuidv4()}
                            onClick={() => handleImageControllerClick(idx)}
                            className={`w-6 md:w-10 h-1.5 md:h-2 rounded-full border-2 border-solid border-gray-500 ${currentIndex === idx ? 'bg-[var(--pilgrim)]' : 'bg-[var(--gray-100)]'}`}
                        ></button>
                        )}
                    </div> */}
                
                </div>

                {/* multi-color-line */}
                <div className="flex">
                    {navLinks.map((nl) => (
                        <div
                            key={nl.slug}
                            style={{ borderColor: nl.color }}
                            className="border-b-4 w-1/6"
                        />
                    ))}
                </div>
            </>
        }

        {
            (heroSlidesData?.length > 0 && !ytData?.isLive) &&
            <p className="absolute max-sm:hidden -bottom-5 whitespace-nowrap max-sm:right-2 max-sm:max-w-[350px] overflow-hidden truncate text-[11px] text-white font-inter right-8">{heroSlidesData[getActualSlideIndex()]?.caption}</p>
        }
        {
            ytData?.caption && 
            <p className="absolute max-sm:hidden -bottom-5 whitespace-nowrap max-sm:right-2 max-sm:max-w-[350px] overflow-hidden truncate text-[11px] text-white font-inter right-8">{ytData?.caption}</p>
        }

    </section>
  )
}

export default HomeHero