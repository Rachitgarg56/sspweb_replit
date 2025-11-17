import Link from 'next/link'
import React from 'react'

const LandingPageCards = ( { subLinks, color } ) => {
  return (
    <div>
        <div>
            {/* subPageCards */}
            <div className="bg-[var(--gray-200)] p-4 grid grid-cols-2 gap-4">
                {subLinks.map((sl) => (
                    <div key={sl.url}
                    className=" block text-white bg-cover bg-center mb-2 aspect-square text-lg font-pt-serif"
                    style={{ backgroundImage: `url(${sl.image})` }}>
                        <div className='relative bg-opacity-45 bg-black w-full h-full'>
                            <div className='absolute top-1/2 left-4 -translate-y-1/2 w-1/2 flex flex-col gap-1 sm:gap-4 items-start'>
                                <p className='text-lg sm:text-[17px]'>{sl.title}</p>
                                <Link href={sl.url}><button style={{backgroundColor: color}} className='uppercase text-[8px] leading-none py-2 sm:text-xs sm:py-2 font-inter font-semibold rounded-sm px-4'>View</button></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default LandingPageCards
