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
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import DownloadIcon from "@mui/icons-material/Download";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";

interface Props { 
    params: Promise<{ slug?: string[] }>
}

const getPageData = cache(async (slugPath: string) => {
  const res = await fetch(`${API_URL + 'tp/branches-navaratri' + slugPath}`);
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

  const sidebarData: SidebarItem[] = await getSidebarData('/branches-navaratri');
  sidebarData.sort((s1, s2) => s1.title.localeCompare(s2.title));
  
  sidebarData.unshift({
    children: [],
    id: '1850239378977',
    link: '/branches-navaratri',
    showChildren: false,
    title: 'Branches'
  });

  return (
    <>
      {/* aside code */}
      <DropdownSidebar data={sidebarData} highlight="var(--events)" />
      <div className="flex flex-col gap-6 w-full py-4 px-12 bg-[#FFFFFF] max-lg:px-6 max-[462px]:px-4">
          <DropdownSidebarMobile data={sidebarData} bgColor='var(--events)' title={pageData.title} bgHover='var(--events-hover)' />

          {
            (slugPath == '') 
            
              ?

              <>
                <h2 className='text-center text-[var(--events)] text-3xl max-sm:text-xl font-pt-serif'>{pageData?.title}</h2>
                <hr />

                {
                  (pageData?.images?.length > 0) &&
                  <img
                    className='w-full'
                    src={`https://files.sringeri.net/${pageData.images[0]}`}  
                    alt={pageData?.title}
                  />
                }

                <div className='xprose events'>
                  <p>The Sri Sharada Sharannavaratrī Mahotsava is celebrated with great devotion and splendor across all branches of Dakshinamnaya Sri Sharada Peetham, Sringeri. Dedicated to Mother Goddess Sharadamba, this sacred festival is marked by daily worship, Chandika Homa, Devi Alankara Darshana, parayanas, and inspiring spiritual and cultural programs. Devotees from across cities gather to participate, seek blessings, and immerse themselves in this annual celebration of dharma and bhakti. Explore the details of the Mahotsava at our branches below.</p>
                  <h2><strong>Festival Dates & Important Celebrations</strong></h2>
                  <p>22nd September – 2nd October 2025</p>
                </div>

                <div className='flex justify-between flex-wrap gap-4 -mt-4'>
                  <div className={`bg-[--events] w-[200px] text-white py-4 px-6 flex items-start gap-2 rounded`}>
                      <figure className='flex'>
                          <FontAwesomeIcon icon={faCalendarPlus} className=" text-[14px]" />
                      </figure>
                      <div>
                          <h3 className={`font-bold text-xs uppercase`}>September 30, 2025</h3>
                          <p className='text-xs font-semibold opacity-75'>Durga Ashtami</p>
                      </div>
                  </div>

                  <div className={`bg-[--events] w-[200px] text-white py-4 px-6 flex items-start gap-2 rounded`}>
                      <figure className='flex'>
                          <FontAwesomeIcon icon={faCalendarPlus} className=" text-[14px]" />
                      </figure>
                      <div>
                          <h3 className={`font-bold text-xs uppercase`}>October 1, 2025</h3>
                          <p className='text-xs font-semibold opacity-75'>Maha Navami</p>
                      </div>
                  </div>

                  <div className={`bg-[--events] w-[200px] text-white py-4 px-6 flex items-start gap-2 rounded`}>
                      <figure className='flex'>
                          <FontAwesomeIcon icon={faCalendarPlus} className=" text-[14px]" />
                      </figure>
                      <div>
                          <h3 className={`font-bold text-xs uppercase`}>October 2, 2025</h3>
                          <p className='text-xs font-semibold opacity-75'>Vijayadashami</p>
                      </div>
                  </div>
                </div>
{/* bg-[#F1F5F7] */}
                <div className='text-[var(--events-hover)] mt-4 rounded'>
                    <h2 className='text-[12.5px] sm:text-[21px] font-medium font-pt-serif'>Branches</h2>
                    <ol className="list-decimal list-outside pl-6 space-y-2 font-inter mt-4">
                        {sidebarData.slice(1).map((item) => (
                            <li key={item.id} className="text-[9.5px] sm:text-[13px] sm:text-sm leading-snug">
                                <Link href={item.link}>
                                  <button
                                      className="underline text-left inline-block break-words"
                                  >
                                      {item.title}
                                  </button>
                                </Link>
                            </li>
                        ))}
                    </ol>
                </div> 
              </>
              
              : 

              <>
                <h2 className='text-center text-[var(--events)] text-3xl max-sm:text-xl font-pt-serif'>Navaratri Celebrations at Sri Sringeri Shankara Math - {pageData?.title}</h2>
                <hr />

                {/* featured-image */}
                {
                  (pageData?.images?.length > 0) &&
                  <img
                    className='w-full max-w-[400px] mx-auto'
                    src={`https://files.sringeri.net/${pageData.images[0]}`}  
                    alt={pageData?.title}
                  />
                }

                <div className='xprose events'>
                  {/* bullet points */}
                  {
                    (pageData?.bulletPoints?.length > 0) && 
                    <>
                      <h2><strong>Navaratri Program Highlights:</strong></h2>
                      <ul>
                        {
                          pageData.bulletPoints.map((point) => <li key={uuidv4()}>{point}</li>)
                        }
                      </ul>
                    </>
                  }

                  {/* download link */}
                  {
                    pageData?.downloadLink && 
                    <Link target="_blank" href={`https://files.sringeri.net/${pageData.downloadLink}`}>
                        <button className="uppercase mt-4 rounded-[3px] bg-[var(--events)] hover:bg-[var(--events-hover)] text-white px-4 py-2 font-inter text-[8px] md:text-[12px] font-bold underline underline-offset-2">
                          <DownloadIcon fontSize="small" />
                          {'Download Full Invitation'}
                        </button>
                    </Link>
                  }

                  {/* address */}
                  {
                    (pageData?.address?.length > 0) &&
                    <>
                      <h2><strong>For Details Contact:</strong></h2>
                      {pageData.address.map((addressLine) => <p key={uuidv4()}>{addressLine}</p>)}
                    </>
                  }

                  {/* contact-numbers */}
                  {
                    (pageData?.contactNumbers?.length > 0) &&
                    <p>Phone Number : {pageData.contactNumbers.join(', ')}</p>
                  }

                  {/* location */}
                  {
                    pageData?.locationLink && 
                    <p>Location Link : <a href={pageData.locationLink} target='_blank'>{pageData.locationText}</a></p>
                  }
                </div>

                {/* images */}
                {
                  (pageData?.images?.length > 1) &&
                  <Gallery images={pageData?.images.slice(1)} imagesCaptions={pageData?.imagesCaptions || []} /> 
                }
              </>
          }

          <SocialShareComponent url={`${URL + pageData.link}`} />
      </div>
    </>
  );
}
