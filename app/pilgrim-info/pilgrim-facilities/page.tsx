// import SocialIcons from '@/app/events/upcoming-events/SocialIcons';
import BreadCrumbs from '../../components/BreadCrumbs';
import React from 'react';

export async function generateMetadata() {
  return {
      title: "Pilgrim Facilities",
      description: "Pilgrim Facilities: Sri Sringeri Sharada Peetham",
      openGraph: {
          title: "Pilgrim Facilities",
          description: "Pilgrim Facilities: Sri Sringeri Sharada Peetham",
          images: [
              {
                  url: "/assets/images/main-page-cards/dos-and-donts.jpg",
                  alt: "Pilgrim Facilities",
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
    { title: "Facilities", link: "/pilgrim-info/pilgrim-facilities" },
  ]
  const breadcrumbsSeperator = "|"

  return (
    <div className=" py-8 font-inter px-4">
      <div className="max-w-[1225px] mx-auto flex flex-col gap-8">
        <div className='md:ml-8'>
          <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator} />
        </div>

        <div className="md:flex md:space-x-6">
          <div className="flex-1 md:ml-8 bg-white shadow-md px-6 p-2 md:px-12 py-6 max-sm:py-4 mb-6 md:mb-12">
            <h1 className="text-4xl max-sm:text-2xl font-pt-serif text-[--pilgrim] mb-8 max-sm:mb-0 text-center">Pilgrim Facilities
            </h1>
            <hr className='my-6' />
           
            <div className='page-content xprose pilgrim mx-auto lg:px-40'>
              <h2>Guest Houses</h2>
              <p>In olden days the Devotees visiting for the Darshan of Goddess Sri Sharada and His Holiness Jagadguru at Sringeri, were to be accommodated at any of the houses at Sringeri.  This was causing a lot of inconvenience to the Devotee as well the residents.  In order to have a comfortable stay at Sringeri and have the darshan of Goddess and Acharya, Sri Sharada Peetham, Sringeri,   constructed  the following Guest houses near the  Sharada Temple.</p>
              <ul>
                <li>Sri Shankara Kripa</li>
                <li>Sri Sharada Kripa</li>
                <li>Yatri Nivas</li>
                <li>Sri Bharathi Tirtha Vihara</li>
                <li>Sri Shankara Sadana</li>
                <li>Sri Srinivasa Kripa constructed by T.T.D</li>
                <li>Sri Bharati Tirtha Krupa</li>
              </ul>
              <p>The above guest houses are provided to the pilgrims and devotees not on commercial basis but for their comfort.  Hence a minimum Kannikai is collected from the devotees for the usage of the above guest houses in order to maintain the electrical and other amenities.  Further there are dormitory system to accommodate a group of devotees in one hall.  The Guest houses are allotted to the pilgrims/devotees on first come-first serve  basis.  Advance booking of the guest house is not entertained.  For the requirement of Guest House, Pilgrims can approach the Information Office located adjacent to Sri Sharada Temple main entrance.</p>
              <h2>Annadana</h2>
              <p>To cater the need of  devotees a big dining hall namely ‘Sri Bharathi Theertha Prasada’  has been built  near  Sri Sharada Temple, Sringeri  and Nitya Annadana is served to the all devotees in the afternoon and night  between 12.15 P.M. and 2.30 P.M.  and  7.15 P.M.  and  8.30 P.M. respectively.  Nitya Annadana is served for almost 7500 people which includes many schools and colleges, hospitals, etc.</p>

              <h2>Temple Darshan Timings:</h2>
              <ul>
                <li>Sharadamba Temple
                  <ul>
                    <li>Normal Days
                      <ul>
                        <li>6:00 AM - 2:00 PM</li>
                        <li>4:00 PM - 9:00 PM</li>
                      </ul>
                    </li>
                    <li>Maha-Mangalarati
                      <ul>
                        <li>10:00 AM</li>
                        <li>12:00 PM</li>
                        <li>7:30 PM</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>Other Temples
                  <ul>
                    <li>6:00 AM - 1:00 PM</li>
                    <li>5:00 PM - 8:00 PM</li>
                  </ul>
                </li>
                <li>Guru Darshanam
                  <ul>
                    <li>10:30 AM - 11:30 AM</li>
                  </ul>
                </li>
                <li>Chandramoulishwara Puja (By Jagadguru)
                  <ul>
                    <li>9:00 PM - 10:00 PM (Normal Days)</li>
                    <li>8:30 PM - 10:00 PM (Fridays)</li>
                  </ul>
                </li>
              </ul>
              <h4 className='italic text-sm mt-4'>*  Based on the events and Jagadguru’s camps, the timings are subject to change.</h4>

              <h2>Other Facilities</h2>

              <h3>Banks</h3>

              <ul>
                <li>Karnataka Bank (with ATM facility)</li>
                <li>Syndicate Bank  (with ATM facility)</li>
                <li>State Bank of Mysore (with ATM facility)</li>
                <li>State Bank of India (with ATM facility)</li>
                <li>Canara Bank</li>
                <li>Bank of India</li>
                <li>Indian Overseas Bank</li>
              </ul>

              <h3>Post Office</h3>
              <p>Post Office is functioning at the heart of Sringeri where Railway booking facility is also available</p>
              <h3>Fuel</h3>
              <p>Petrol Station of H.P., B.P. and I.O.C.L. are available at Sringeri.</p>
              <h3>Communication</h3>
              <p>Plenty of Communication providers for Telephone,  Mobile shops and Internet Browsing Centres are available nearby the Temple vicinity.</p>
              <h3>Pooja items</h3>
              <p>All sort of Pooja articles are available around the Temple complex for the Devotees</p>
              <h3>Transport</h3>
              <p>Auto Rikshaws and call taxis are available for the benefit of people</p>
              <h3>Medical Facilities</h3>
              <p>Sharada Dhanvanthari Charitable Hospital with out-patient ward, modern clinical laboratory, ECG and medical specialists services is located at a reachable distance of 4 Kms (approx.) from Sringeri Math.  Apart from this, there are many Medical shops.</p>

              <h3>Wheel Chair</h3>
              <p>For having a peaceful Darshan of Goddess Sri Sharadamba, other deities and Sri Jagadguru, Sringeri Math is providing the wheel chair for the physically challanged and aged people on returnable basis. This foldable wheel chair can be collected from the Information Centre at Sringeri Math for free of  cost and returned after Darshan.</p>

              <h3>Vehicle Parking</h3>
              <p>Pilgrims visiting Sringeri by four wheelers are provided with a vehicle parking facility at the Northern bank of Tunga River.</p>

              <br />
              {/* <SocialIcons/> */}

            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
