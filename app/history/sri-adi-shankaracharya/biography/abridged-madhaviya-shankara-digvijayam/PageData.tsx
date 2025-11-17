'use client'

import React from 'react'
import DropdownSidebar from '@/app/components/DropdownSidebar';
import { DropdownSidebarMobile } from '@/app/components/DropdownSidebarMobile';
import { URL } from '@/config/api';
import SocialShareComponent from '@/app/components/SocialShareComponent';
import Gallery from '@/app/components/Gallery';

const PageData = ({  pageData, sidebarData, headingList, contentWithIds }) => {
  return (
    <>
      {/* aside code */}
      <DropdownSidebar data={sidebarData} highlight={'var(--about)'} />
      <div className="flex flex-col gap-6 w-full py-4 px-16 bg-[#FFFFFF] max-lg:px-6 max-[462px]:px-4">
          <DropdownSidebarMobile data={sidebarData} bgColor='var(--about)' title={pageData.title} bgHover='var(--about-hover)' />
          <h2 className='text-center text-[var(--about)] text-[37px] max-sm:text-2xl font-pt-serif'>{pageData?.title}</h2>
          <hr />
          {
            (pageData?.images?.length == 1) &&
            <img
            src={`https://files.sringeri.net/${pageData.images[0]}`}  
                alt={pageData?.title}
            />
          }

        <div>
            <div className='text-[var(--about)] bg-[#F1F5F7] p-4 sm:p-8 rounded'>
                <h3 className='text-xl font-medium font-pt-serif'>Contents</h3>
                <ol className="list-decimal list-outside pl-6 space-y-2 font-inter mt-4">
                    {headingList.map((item) => (
                        <li key={item.id} className="text-xs sm:text-sm leading-snug">
                            <button
                                onClick={() => {
                                    const el = document.getElementById(item.id);
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="underline text-left inline-block break-words"
                            >
                                {item.title}
                            </button>
                        </li>
                    ))}
                </ol>

            </div>

            <div dangerouslySetInnerHTML={{ __html: contentWithIds }} className='page-content xprose about'>
                
            </div>
        </div>

          {
            (pageData?.images?.length > 1) &&
            <Gallery images={pageData?.images} imagesCaptions={pageData?.imagesCaptions || []} /> 
          }
          <SocialShareComponent url={`${URL + pageData.link}`} />
      </div>
    </>
  )
}

export default PageData
