import BreadCrumbs from '../components/BreadCrumbs';
import React, { cache } from 'react';
import { API_URL } from '@/config/api';
import { Metadata } from 'next';
import { getFirstNWords, stripHTML } from '@/utils/helpers';
import { URL } from '@/config/api';
import SocialShareComponent from '@/app/components/SocialShareComponent';
import Gallery from '../components/Gallery';

interface Props {
  params: Promise<{ slug: string }>; 
}

const getPageData = cache(async () => {
  const res = await fetch(`${API_URL}tp/history`);
  if (!res.ok) throw new Error("Failed to fetch history page data");
  const data = await res.json();
  return data;
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  
  const pageData = await getPageData()

  return {
      title: pageData?.title,
      description: pageData?.content,
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
  }

}

export default async function Page() {

  const pageData = await getPageData()

  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about", desktopClick: false },
    { title: "History", link: "/history" },
  ]
  
  const breadcrumbsSeperator = "|"

  return (
    <div className=" py-8 font-inter px-4 bg-[#F7F2EC]">
      <div className="max-w-[1225px] mx-auto flex flex-col gap-8 md:pb-12">
        <div className='md:ml-8'>
          <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator} />
        </div>
        <div className="md:flex md:space-x-6">
          <div className="flex-1 md:ml-8 bg-white shadow-md p-6 md:px-12">
            <h1 className="text-center text-[var(--about)] text-[37px] max-sm:text-2xl font-pt-serif mb-8">{pageData?.title}</h1>
            
            <hr className='my-6' />
              
            <div className="md:mt-12">
              {
                (pageData?.images?.length == 1) &&
                <img
                src={`https://files.sringeri.net/${pageData.images[0]}`}  
                    alt={pageData?.title}
                />
              }

              <div
                className="page-content xprose about mx-auto lg:px-40" 
                dangerouslySetInnerHTML={{ __html: pageData?.content || "" }}
              />

              {
                (pageData?.images?.length > 1) &&
                <Gallery images={pageData?.images} imagesCaptions={pageData?.imagesCaptions || []} /> 
              }
              <SocialShareComponent url={`${URL + 'history'}`} />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
