import Image from "next/image";
import Link from "next/link";
import { navLinks, NavLink, SubLink } from '../components/NavLinks';
import BreadCrumbs from "../components/BreadCrumbs";
import { getFirstNWords } from "@/utils/helpers";
import LandingPageCards from "../components/LandingPageCards";

const subLinks: SubLink[] = [
  { title: 'Aksharabhyasa', url: '/sevas/aksharabhyasa', image: '/assets/images/pilgrim_hero.jpg' },
  { title: 'Temple Timings', url: '/pilgrim-info/temple-timings', image: "/assets/images/main-page-cards/PilgrimInfo/PILGRIMINFO-TEMPLETIMINGS.jpg" },
  { title: 'Travel & Weather', url: '/pilgrim-info/travel-and-weather', image: "/assets/images/main-page-cards/PilgrimInfo/PILGRIMINFO-TRAVEL&WEATHER.jpg" },
  // { title: "Do's & Dont's", url: "/pilgrim-info/dos-and-donts", image: "/assets/images/main-page-cards/PilgrimInfo/PILGRIMINFO-DOSDONTS.jpg" },
  { title: "Facilities", url: "/pilgrim-info/pilgrim-facilities", image: "/assets/images/main-page-cards/PilgrimInfo/PILGRIMINFO-FACILITIES.jpg" },
  { title: 'Temples', url: '/temples', image: "/assets/images/main-page-cards/PilgrimInfo/PILGRIMINFO-TEMPLES.jpg" },
  { title: 'Darshan Schedule', url: '/schedule', image: '/assets/images/pilgrim_hero.jpg', externalLink: true },
];

export async function generateMetadata() {

  return {
      title: "Pilgrim Info - Sri Sringeri Sharada Peetham",
      description: getFirstNWords("Sringeri, a holy, scenic, hilly place in Karnataka is where peace is palpable, tangible.  Enchanted by the sacred spot, of matchless serenity, Sri Adi Shankaracharya founded here the first and foremost of his mathas, the Sringeri Math, also known as the Sringeri Sharada Peetham. Sringeri is where time has stood still; the Sringery of legend, the […]"),
      openGraph: {
          title: "Pilgrim Info - Sri Sringeri Sharada Peetham",
          description: getFirstNWords("Sringeri, a holy, scenic, hilly place in Karnataka is where peace is palpable, tangible.  Enchanted by the sacred spot, of matchless serenity, Sri Adi Shankaracharya founded here the first and foremost of his mathas, the Sringeri Math, also known as the Sringeri Sharada Peetham. Sringeri is where time has stood still; the Sringery of legend, the […]"),
          images: [
              {
                  url: "/assets/images/og-images/pilgrim-info-og-image.jpg",
                  alt: "Pilgrim Info - Sri Sringeri Sharada Peetham",
              },
          ],
          type: "website",
      }
  };
}

export default function PilgrimInfo() {
  
  const breadcrumbsSeperator = '|';

  let breadcrumbs = [
      { title: "Home", link: "/" },
      { title: "Pilgrim Info", link: "/pilgrim-info" },
  ];

  return (
    <div className="bg-[var(--gray-200)]">
      {/* breadcrumbs */}
      <div className="text-xs px-5 py-2">
        <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator}/>
      </div>
      {/* Submenu Tab Content */}
      <LandingPageCards subLinks={subLinks} color={'var(--pilgrim)'}/>
    </div>
  );
}