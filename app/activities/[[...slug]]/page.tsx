import React, { cache } from 'react'
import BreadCrumbs from '../../components/BreadCrumbs'
import DropdownSidebar from '../../components/DropdownSidebar'
import { SidebarItem } from '../../src/types'
import { API_URL } from '@/config/api'
import { Metadata } from 'next'
import { getFirstNWords, getSidebarData, stripHTML } from '@/utils/helpers'
import { DropdownSidebarMobile } from '@/app/components/DropdownSidebarMobile'
import { URL } from '@/config/api';
import SocialShareComponent from '@/app/components/SocialShareComponent';
import Gallery from '@/app/components/Gallery'

interface Props { 
    params: Promise<{ slug?: string[] }>
}

const getPageData = cache(async (slugPath: string) => {
    const res = await fetch(`${API_URL}tp/activities/${slugPath}`);
    if (!res.ok) throw new Error("Failed to fetch activity page data");
    const data = await res.json();
    return data;
});
  
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params; 
    const slugPath = slug ? slug.join("/") : "";
    const data = await getPageData(slugPath);
  
    return {
        title: data?.title,
        description: getFirstNWords(stripHTML(data?.content), 50),
        openGraph: {
            title: data?.title,
            description: getFirstNWords(stripHTML(data?.content), 50),
            images: [
                {
                    url: data?.images?.length ? data.images[0] : '',
                    alt: data?.title,
                },
            ],
            type: "website",
        }
    };
}
  

const page = async ({ params }: Props) => {
    const { slug } = await params; 
    const slugPath = slug ? slug.join("/") : "";
    const data = await getPageData(slugPath);

    const sidebarData: SidebarItem[] = await getSidebarData('/activities')

    const breadcrumbs = [
        { title: "Home", link: "/" },
        { title: "About", link: "/about", desktopClick: false },
        slugPath !== "" && { title: "Activities", link: "/activities" },
        { title: data?.title, link: '/'+data?.link },
    ].filter(Boolean);
    
    const breadcrumbsSeperator = "|"

    return (
        <section className="p-4 bg-[--gray-100]">
            <div className="max-w-[1175px] m-auto flex flex-col gap-4">
                <div className='mt-4'>
                    <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator} />
                </div>
                
                <div className="flex items-center gap-6">
                    <div className="min-w-72 max-lg:hidden"></div>
                    {/* <h1 className="text-center text-4xl mb-5 text-[var(--resources)] w-full">Downloads</h1> */}
                </div>
                
                <div className="page-main-inner-container flex gap-6 relative max-lg:flex-col pb-14">
                    {/* aside code */}
                    <DropdownSidebar data={sidebarData} highlight='var(--about)' />

                    {/* main section code */}
                    <div className="flex flex-col gap-6 w-full py-4 px-12 bg-[#FFFFFF] max-lg:px-6 max-[462px]:px-4">
                        <DropdownSidebarMobile data={sidebarData} bgColor='var(--about)' title={data.title} bgHover='var(--about-hover)' />
                        <h1 className='text-center font-pt-serif text-[var(--about)] text-4xl max-sm:text-2xl'>{data?.title}</h1>

                        <hr />

                        {
                            (data?.images?.length == 1) &&
                            <img
                            src={`https://files.sringeri.net/${data.images[0]}`}  
                                alt={data?.title}
                            />
                        }

                        {
                            data?.content &&
                            <div className='page-content xprose about mx-auto' dangerouslySetInnerHTML={{ __html: data?.content }}></div>                             
                        }

                        {
                            (data?.images?.length > 1) &&
                            <Gallery images={data?.images} imagesCaptions={data?.imagesCaptions || []} /> 
                        }

                        <SocialShareComponent url={`${URL + data.link}`} />

                    </div>

                </div>
            </div>
        </section>
    )
}

export default page