import React, { cache } from 'react';
import { API_URL } from '@/config/api';
import { Metadata } from 'next';
import { getFirstNWords, getSidebarData, stripHTML } from '@/utils/helpers';
import { SidebarItem } from '@/app/src/types';
import DropdownSidebar from '@/app/components/DropdownSidebar';
import { DropdownSidebarMobile } from '@/app/components/DropdownSidebarMobile';
import { URL } from '@/config/api';
import SocialShareComponent from '@/app/components/SocialShareComponent';
import Gallery from '@/app/components/Gallery';

interface Props { 
    params: Promise<{ slug?: string[] }>
}

const getPageData = cache(async (slugPath: string) => {
  const res = await fetch(`${API_URL + 'tp/branches' + slugPath}`);
  if (!res.ok) throw new Error("Failed to fetch page data");
  const data = await res.json();
  return data;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug ? '/' + slug.join("/") : "";
  const pageData = await getPageData(slugPath)

  return {
      title: pageData?.title,
      description: getFirstNWords(stripHTML(pageData?.content), 50),
      openGraph: {
          title: pageData?.title,
          description: getFirstNWords(stripHTML(pageData?.content), 50),
          images: [
              {
                  url: pageData?.images?.length ? pageData.images[0] : '',
                  alt: pageData?.title,
              },
          ],
          type: "website",
      }
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const slugPath = slug ? '/' + slug.join("/") : "";
  const pageData = await getPageData(slugPath)

  const sidebarData: SidebarItem[] = await getSidebarData('/branches');

  return (
    <>
      {/* aside code */}
      <DropdownSidebar data={sidebarData} highlight="var(--contact)" />
      <div className="flex flex-col gap-6 w-full py-4 px-12 bg-[#FFFFFF] max-lg:px-6 max-[462px]:px-4">
          <DropdownSidebarMobile data={sidebarData} bgColor='var(--contact)' title={pageData.title} bgHover='var(--contact-hover)' />
          <h2 className='text-center text-[var(--contact)] text-[37px] max-sm:text-2xl font-pt-serif'>{pageData?.title}</h2>
          <hr />
          {
            (pageData?.images?.length == 1) &&
            <img
            src={`https://files.sringeri.net/${pageData.images[0]}`}  
                alt={pageData?.title}
            />
          }

          <div dangerouslySetInnerHTML={{ __html: pageData?.content }} className='xprose contact'>
              
          </div>

          {
            (pageData?.images?.length > 1) &&
            <Gallery images={pageData?.images} imagesCaptions={pageData?.imagesCaptions || []} /> 
          }
          <SocialShareComponent url={`${URL + pageData.link}`} />
      </div>
    </>
  );
}
