// import SocialIcons from '@/app/events/upcoming-events/SocialIcons';
import BreadCrumbs from '../../components/BreadCrumbs';
import React from 'react';

export async function generateMetadata() {
  return {
      title: "Dos and Donts",
      description: "Travel and Weather: Sri Sringeri Sharada Peetham",
      openGraph: {
          title: "Dos and Donts",
          description: "Dos and Donts: Sri Sringeri Sharada Peetham",
          images: [
              {
                  url: "/assets/images/main-page-cards/dos-and-donts.jpg",
                  alt: "Dos and Donts",
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
    { title: "Do's & Dont's", link: "/pilgrim-info/dos-and-donts" },
  ]
  const breadcrumbsSeperator = "|"

  return (
    <div className=" py-8 font-inter px-4">
      <div className="max-w-[1225px] mx-auto flex flex-col gap-8">
        <div className='md:ml-8'>
          <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator} />
        </div>

        <div className="md:flex md:space-x-6">
          <div className="flex-1 md:ml-8 bg-white shadow-md px-6 p-2 py-6 max-sm:py-4 mb-6 md:mb-12">
            <h1 className="text-4xl max-sm:text-2xl font-pt-serif text-[--pilgrim] mb-8 max-sm:mb-0 text-center">Do's & Dont's</h1>
            <hr className='my-6' />
           
            <div className='page-content xprose pilgrim mx-auto lg:px-40'>
              <h2>Do's</h2>
              <ul>
                <li>Pay Obeisance to Guru and Ishta or Kula Devata before you start for Sringeri.
                </li>
                <li>Bathe and wear clean clothes before you enter the shrine.
                </li>
                <li>Concentrate on the Goddess, Sri Saradamba inside the Temple.
                </li>
                <li>Observe absolute silence inside the Temple.
                </li>
                <li>Respect ancient customs and usages while at Sringeri.
                </li>
                <li>Respect and promote religious sentiments among co-pilgrims.
                </li>
                <li>Deposit your offerings in the Hundi Only.
                </li>
                <li>Gents need to remove their Shirts and Banians before entering the Gurunivas.
                </li>
                <li>Observe Silence inside the Math complex (temples, Narasimhavana and Gurunivas).
                </li>
                <li>Switch Off your Mobile phones while you are inside the Math complex (temples, Narasimhavana and Gurunivas)
                </li>
                <li>Take care of your belongings as Math is not responsible for the loss/damage of your belongings.
                </li>
                <li>Approach for assistance from Enquiry Office/Admn. Office during emergencies.
                </li>
                <li>Help us by abiding the rules of the Math to serve you better.
                </li>
              </ul>
              <h2>Do not</h2>
              <ul>
                <li>Carry much jewellery and cash with you.
                </li>
                <li>Wear footwear in and around Math complex (temples, Narasimhavana and Gurunivas).
                </li>
                <li>Approach touts for accommodation and darshan.
                </li>
                <li>Eat non-vegetarian food.
                </li>
                <li>Consume liquor or other intoxicants.
                </li>
                <li>Smoke on Sringeri Hills.
                </li>
                <li>Buy spurious prasadams from street vendors.
                </li>
                <li>Come to Sringeri for any purpose other than worshipping the Goddess and doing meditation.
                </li>
                <li>Rush in for Darshan but take your chance in the queue.
                </li>
                <li>Enter the Temple; if according to custom or usage, you are prohibited to enter.
                </li>
                <li>Take photos inside temples and Gurunivas
                </li>
                <li>Encourage beggary.
                </li>
                <li>Spit or commit nuisance in the premises of the Temple.
                </li>
                <li>Wear Lungis or pants/Jeans or Salvar Kameez while performing Sevas at Gurunivas
                </li>
                <li>Take Photographs of the deities, Adhishthanams, and inside Gurunivas
                </li>
                <li>Loiter
                </li>
                <li>Use tobaccos such as panparag etc.
                </li>
                <li>Throw the waste outside the dustbin
                </li>
                <li>Feed non eatables to fish
                </li>
                <li>Catch fish
                </li>
                <li>Throw plastic covers into the river
                </li>
                <li>Wear footwear inside the Math premises, and while crossing the Vidya Tirtha Sethu.
                </li>
                <li>Enter the restricted areas where there is a no-entry board
                </li>
                <li>Talk unnecessarily inside the Temple premises or at Gurunivas
                </li>
                <li>Touch the unauthorized/suspected material inside the Math Premises
                </li>
                <li>Swim in the river
                </li>
                <li>Bring any non-vegetarian or prohibited food/items inside Math premises
                </li>
              </ul>

              <br />
              {/* <SocialIcons/> */}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
