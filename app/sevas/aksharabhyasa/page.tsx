import { API_URL } from '@/config/api';
import BreadCrumbs from '../../components/BreadCrumbs';
import React, { cache } from 'react';
import { getFirstNWords, stripHTML } from '@/utils/helpers';
import { URL } from '@/config/api';
import SocialShareComponent from '@/app/components/SocialShareComponent';
import Gallery from '@/app/components/Gallery';

const getPageData = cache(async () => {
    const res = await fetch(API_URL + 'sevas/aksharabhyasa');
    const data = await res.json();
    return data;  
})

export async function generateMetadata() {
    const data = await getPageData();
  return {
      title: data?.title,
      description: getFirstNWords(stripHTML(data?.content), 50),
      openGraph: {
          title: data?.title,
          description: getFirstNWords(stripHTML(data?.content), 50),
          images: [
              {
                  url: "/assets/images/main-page-cards/travel-and-weather.jpg",
                  alt: data?.title,
              },
          ],
          type: "website",
      }
  };
}

export default async function Page() {
  const data = await getPageData();

  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "Pilgrim Info", link: "/pilgrim-info", desktopClick: false },
    { title: "Aksharabhyasa", link: "/sevas/aksharabhyasa" },
  ]
  const breadcrumbsSeperator = "|"

  return (
    <div className=" py-8 font-inter px-4">
      <div className="max-w-[1175px] mx-auto flex flex-col gap-8">
        <div>
          <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator} />
        </div>

        <div className="md:flex md:space-x-6">
          <div className="flex-1 bg-white shadow-md px-6 p-2 py-6 max-sm:py-4 mb-6 md:mb-12">
            <h1 className="text-4xl max-sm:text-2xl font-pt-serif text-[--pilgrim] mb-8 max-sm:mb-0 text-center">{data?.title}</h1>
            <hr className='my-6' />
            {
              (data?.images?.length == 1) &&
              <img
              src={`https://files.sringeri.net/${data.images[0]}`}  
                  alt={data?.title}
              />
            }
           
            <div dangerouslySetInnerHTML={{__html: data?.content}} className='page-content xprose pilgrim lg:px-40'>

            </div>

            {
              (data?.images?.length > 1) &&
              <Gallery images={data?.images} imagesCaptions={data?.imagesCaptions || []} /> 
            }
            
            <SocialShareComponent url={`${URL + 'sevas/aksharabhyasa'}`} />

          </div>
        </div>
      </div>
    </div>
  )
}

