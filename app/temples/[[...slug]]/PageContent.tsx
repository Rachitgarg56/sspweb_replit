'use client'

import DropdownSidebar from '@/app/components/DropdownSidebar';
import BreadCrumbs from '../../components/BreadCrumbs';
import { usePathname } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import { DropdownSidebarMobile } from '@/app/components/DropdownSidebarMobile';
import { getSidebarData } from '@/utils/helpers';
import { URL } from '@/config/api';
import SocialShareComponent from '@/app/components/SocialShareComponent';
import Gallery from '@/app/components/Gallery';

interface Temple {
  title: string;
  content: ReactNode;
  link: string;
  images: string[];
  imagesCaptions: string[];
}

interface Props {
    params: Promise<{ slug: string[] }>; 
    templeData: Temple | null;
}

export default function Page({ params, templeData }: Props) {
    const [sidebarData, setSidebarData] = useState([]); 
    const pathname = usePathname();
  
    const breadcrumbs = [
      { title: "Home", link: "/" },
      { title: "Pilgrim Info", link: "/pilgrim-info", desktopClick: false },
      { title: "Temples", link: "/temples" },
      { title: templeData?.title, link: templeData?.link ? '/'+templeData.link : '' },
    ].filter(t => t.title)
    
    const breadcrumbsSeperator = "|"

    useEffect(() => {
      async function fetchSidebarData() {
        const data = await getSidebarData('/temples');
        setSidebarData(data);
      }

      fetchSidebarData();
    },[pathname])

    if (!templeData) {
        return (
            <section className="p-4 bg-[--gray-100]">
                <div className="max-w-[1175px] m-auto flex flex-col gap-4">
                    <div className='py-4'>
                        <BreadCrumbs breadcrumbs={[{ title: "Home", link: "/" }, { title: "Pilgrim Info", link: "/pilgrim-info", desktopClick: false }, { title: "Temples", link: "/temples" }]} breadcrumbsSeperator={breadcrumbsSeperator} />
                    </div>
                    <div className="flex flex-col w-full py-4 px-12 bg-[#FFFFFF] max-lg:px-6 max-[462px]:px-4">
                        <p className="text-center text-[var(--pilgrim)]">Loading temples information...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
      <section className="p-4 bg-[--gray-100]">
        <div className="max-w-[1175px] m-auto flex flex-col gap-4">
          <div className='py-4'>
            <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator} />
          </div>
          <div className="page-main-inner-container flex gap-6 relative max-lg:flex-col pb-14">
            {/* aside code */}
            <div className='hidden lg:block'>
              <DropdownSidebar data={sidebarData} heading='Temples' highlight='var(--pilgrim)' />
            </div>

            {/* main section code */}
            <div className="flex flex-col w-full py-4 px-12 bg-[#FFFFFF] max-lg:px-6 max-[462px]:px-4">
              <DropdownSidebarMobile data={sidebarData} bgColor='var(--pilgrim)' title={templeData.title} bgHover='var(--pilgrim-hover)' />
            <div className="flex flex-col w-full py-4 px-12 bg-[#FFFFFF] sm:gap-4 max-lg:px-6 max-[462px]:px-0 mb-6 md:mb-0 max-sm: pt-2">
              <h1 className='text-[var(--pilgrim)] sm:text-center text-[37px] max-sm:text-[20px] max-sm:my-1 font-pt-serif'>{templeData.title}</h1>
              <hr className="my-2 mb-6" /> 
              {
                (templeData?.images?.length == 1) &&
                <img
                src={`https://files.sringeri.net/${templeData.images[0]}`}  
                    alt={templeData?.title}
                />
              }

              <div dangerouslySetInnerHTML={{__html : templeData?.content}} className='page-content xprose pilgrim'></div> 

              {
                (templeData?.images?.length > 1) &&
                <Gallery images={templeData?.images} imagesCaptions={templeData?.imagesCaptions || []} /> 
              }
              <SocialShareComponent url={`${URL + templeData.link}`} />
            </div>
          </div>
        </div>
        </div>
      </section>
    );
}

