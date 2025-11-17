import Link from 'next/link';
import BreadCrumbs from '../../components/BreadCrumbs';
import React from 'react';

const travelData = [
  {
    location: "Bangalore",
    kilometres: 360,
    modes: "Bus, Mini-bus, Private car, Taxi",
    time: 8,
  },
  {
    location: "Mysore",
    kilometres: 260,
    modes: "Bus, Private car, Taxi",
    time: 7,
  },
  {
    location: "Mangalore",
    kilometres: 110,
    modes: "Bus, Private car, Taxi",
    time: 4,
  },
  {
    location: "Udipi",
    kilometres: 80,
    modes: "Mini-bus, Private car, Taxi",
    time: 2.5,
  },
  {
    location: "Shimoga",
    kilometres: 105,
    modes: "Bus, Mini-bus, Private car, Taxi",
    time: 3,
  },
  {
    location: "Hassan",
    kilometres: 160,
    modes: "Bus, Private car, Taxi",
    time: 4,
  },
  {
    location: "Chickmagalore",
    kilometres: 100,
    modes: "Bus, Private car, Taxi",
    time: 3,
  },
  {
    location: "Dharmasthala",
    kilometres: 110,
    modes: "Bus, Private car, Taxi",
    time: 4,
  },
  {
    location: "Kollur",
    kilometres: 110,
    modes: "Bus, Private car, Taxi",
    time: 4,
  },
  {
    location: "Koppa",
    kilometres: 30,
    modes: "Bus, Private car, Taxi",
    time: 1,
  },
]

export async function generateMetadata() {
  return {
      title: "Travel and Weather",
      description: "Travel and Weather: Sri Sringeri Sharada Peetham",
      openGraph: {
          title: "Travel and Weather",
          description: "Travel and Weather: Sri Sringeri Sharada Peetham",
          images: [
              {
                  url: "/assets/images/main-page-cards/travel-and-weather.jpg",
                  alt: "Travel and Weather",
              },
          ],
          type: "website",
      }
  };
}


export default function Page() {

  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "Pilgrim Info", link: "/pilgrim-info", desktopClick: false },
    { title: "Travel & Weather", link: "/pilgrim-info/travel-and-weather" },
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
            <h1 className="text-4xl max-sm:text-2xl font-pt-serif text-[--pilgrim] mb-8 max-sm:mb-0 text-center">Travel & Weather</h1>
            <hr className='my-6' />
           
            <div className='page-content xprose pilgrim lg:px-40'>

              <div className="w-full overflow-x-auto">
                <table className="min-w-[600px] w-full bg-white">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-4 max-sm:px-2 py-3 text-center text-sm font-semibold text-gray-900 sm:text-base whitespace-break-spaces">Location (From)</th>
                      <th className="px-4 max-sm:px-2 py-3 text-center text-sm font-semibold text-gray-900 sm:text-base whitespace-break-spaces">Kilometres</th>
                      <th className="px-4 max-sm:px-2 py-3 text-center text-sm font-semibold text-gray-900 sm:text-base whitespace-break-spaces">Modes</th>
                      <th className="px-4 max-sm:px-2 py-3 text-center text-sm font-semibold text-gray-900 sm:text-base whitespace-break-spaces">
                        Approximate Travelling time by bus
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {travelData.map((item, index) => (
                      <tr key={item.location} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 max-sm:px-2 py-3 text-sm text-gray-900 sm:text-base text-center">{item.location}</td>
                        <td className="px-4 max-sm:px-2 py-3 text-sm text-gray-900 sm:text-base text-center">{item.kilometres}</td>
                        <td className="px-4 max-sm:px-2 py-3 text-sm text-gray-900 sm:text-base text-center">{item.modes}</td>
                        <td className="px-4 max-sm:px-2 py-3 text-sm text-gray-900 sm:text-base text-center">{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className='mt-6 max-sm:text-xl my-4 text-2xl font-semibold'>Nearest Railway Station:</h2>
              <ol className='list-decimal pl-4'>
                <li>Shimoga</li>
                <li>Udipi</li>
                <li>Mangalore</li>
                <li>Bangalore</li>
              </ol>

              {/* <h2 className='mt-6 max-sm:text-xl my-4 text-2xl font-semibold'>Location</h2>
              <Link title='googlemap' className='flex flex-col items-start w-fit gap-2' href="http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Sringeri,+Karnataka,+India&amp;sll=13.280046,75.50354&amp;sspn=1.625215,2.903137&amp;ie=UTF8&amp;ll=13.416337,75.250854&amp;spn=3.248288,5.806274&amp;z=8&amp;iwloc=A">
                <img className='border border-solid border-gray-600' src="/assets/images/pilgrim-info/travel-and-weather/sringeri_scene.jpg" alt="location-image" />
                <p className='text-[0.8rem] text-blue-500 text-center w-full'>Sringeri – The abode of Acharyas</p>
              </Link> */}

              <h2 className='mt-6 max-sm:text-xl my-4 text-2xl font-semibold'>Various routes</h2>
              <p className='mb-2'>The Bus services are available to reach Sringeri from the following places :</p>
              <ul className='list-disc pl-4'>
                <li>Bangalore</li>
                <li>Mangalore</li>
                <li>Udipi</li>
                <li>Mysore</li>
                <li>Shimoga</li>
                <li>Chikmagalore</li>
                <li>Dharmasthala</li>
                <li>Kollur</li>
                <li>Koppa</li>
              </ul>

              <h2 className='mt-6 max-sm:text-xl my-4 text-2xl font-semibold'>Seasons</h2>
              <p className='mb-4'>The general climatic conditions at Sringeri will be</p>
              <ul>
                <li>March to Mid June – Hot
                </li>
                <li>Mid June onwards – Rainy season begins
                </li>
                <li>Mid July to Mid September – Heavy Rainfalls
                </li>
                <li>Mid September to Mid October – normal rainfall</li>
                <li>October to February – Chill</li>
              </ul>

              <h2 className='mt-6 max-sm:text-xl my-4 text-2xl font-semibold'>Other info</h2>
              <h3 className='my-2 text-lg md:text-xl font-semibold'>Umbrella</h3>
              <p>Sringeri experiences very heavy rains coupled with torrential winds during the months of June to September. Pilgrims visiting Sringeri during these months are recommended to carry umbrellas.</p><br />
              <h3 className='my-2 text-lg md:text-xl font-semibold'>Torch</h3>
              <p>Sringeri being surrounded by forests, power transmission during rainy season is volatile. Therefore pilgrims are also recommended to carry torches.</p><br />
              <h3 className='my-2 text-lg md:text-xl font-semibold'>Blanket</h3>
              <p>The period extending from November to February is characterized by a chilly climate with temperatures dropping as low as 10° centigrade. Though blankets and bedsheets are provided in the guesthouses, pilgrims are recommended to carry with them shawls, blankets and other protective clothing while visiting Sringeri during these months.</p><br />

            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
