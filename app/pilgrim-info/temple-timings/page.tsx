import BreadCrumbs from '../../components/BreadCrumbs';
import React from 'react';

interface Timing {
  title: string;
  durations: {title: string, display: string}[];
}

const timings: Timing[] = [
  { title: 'Sharadamba Temple', durations : [{title: "Normal Days", display: '6:00 AM - 2:00 PM | 4:00 PM - 9:00 PM'}, {title:'Maha-Mangalarati', display: '10:00 AM | 12:00 PM | 7:30 PM'}] },
  { title: 'Other Temples', durations : [{title: "Everyday", display: '6:00 AM - 1:00 PM | 5:00 PM - 8:00 PM'},] },
  { title: 'Guru Darshanam', durations : [{title: "Everyday", display: '10:30 AM - 11:30 AM'},] },
  { title: 'Chandramoulishwara Puja by Jagadguru', durations : [{title: "Normal Days", display: '9:00 PM - 10:00 PM'}, {title: 'Fridays', display: '8:30 PM - 10:00 PM'}] },
];

export async function generateMetadata() {
  return {
      title: "Temple Timings",
      description: "Temple Timings for Sri Sringeri Sharada Peetham",
      openGraph: {
          title: "Temple Timings",
          description: "Temple Timings for Sri Sringeri Sharada Peetham",
          images: [
              {
                  url: "/assets/images/main-page-cards/temple-timings.jpg",
                  alt: "Temple Timings",
              },
          ],
          type: "website",
      }
  };
}


const Aside: React.FC = () => (
  <aside className="bg-white h-32 w-64 px-12 py-6 md:p-6 shadow-md mb-8 md:mb-0">
    <h2 className="text-lg font-pt-serif text-[--brown-dark] mb-4">Language</h2>
    <select className="w-full p-2 text-white uppercase text-xs rounded-sm shadow-sm bg-[--pilgrim] focus:ring-[--pilgrim-hover] focus:border-[--pilgrim-hover]">
      <option>English</option>
      <option>Kannada</option>
      <option>Sanskrit</option>
    </select>
  </aside>
);

export default function TempleTimings() {
  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "Pilgrim Info", link: "/pilgrim-info", desktopClick: false },
    { title: "Temple Timings", link: "/pilgrim-info/temple-timings" },
  ]
  const breadcrumbsSeperator = "|"

  return (
    <div className=" py-8 font-inter px-4 bg-[--gray-100]">
      <div className="max-w-[1225px] mx-auto flex flex-col gap-8">
        <div className='md:ml-8'>
          <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator} />
        </div>
        <div className="md:flex md:space-x-6">
          {/* <Aside /> */}
          <div className="flex-1 md:ml-8 bg-white shadow-md p-6 pb-10 md:px-12 max-sm:p-4 mb-6 md:mb-12">
          <h1 className="text-center text-[var(--pilgrim)] text-[37px] max-sm:text-[20px] font-pt-serif sm:mb-8 max-sm:text-left">Temple Timings</h1>
          <hr className='my-6 max-sm:my-4 sm:mb-10' />
            {
              timings.map((timing, index) => (
                <>
                  <div key={index} className="lg:px-40">
                    <h2 className="text-[12px] md:text-[17px] font-pt-serif text-[--pilgrim] mb-2">
                      {timing.title.includes('by Jagadguru') ? (
                        <>
                          {timing.title.replace(" by Jagadguru", "")} <em>by Jagadguru</em>
                        </>
                      ) : (
                        timing.title
                      )}
                    </h2>
                    {
                      timing.durations.map((duration) => {
                        return (
                          <div className='text-[13px] max-sm:text-[9px] font-inter text-[var(--brown-dark)] mb-3'>
                            <span className='font-semibold'>{duration.title}</span>
                            <span>{' | ' + duration.display}</span>
                          </div>
                        )
                      })
                    }
                  </div>
                  <hr className='my-10 max-sm:my-4' />
                </>
              ))
            }
              
            <p className="text-sm max-sm:text-[9px] text-[--brown-dark] mt-4 italic lg:px-40">
              * Based on the events and Jagadguru's camps, the timings are subject to change.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
