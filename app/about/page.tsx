import Link from "next/link";
import { SubLink } from '../components/NavLinks';
import BreadCrumbs from "../components/BreadCrumbs";
import LandingPageCards from "../components/LandingPageCards";

const subLinks: SubLink[] = [
    // { title: 'About: Home', url: '/about' },
    { title: 'History', url: '/history', image: "/assets/images/main-page-cards/about.jpg" },
    { title: 'Guru Parampara', url: '/jagadgurus', image: "/assets/images/main-page-cards/About/ABOUT-GURUPARAMPARA-Sri-Vidyaranya.jpg" },
    { title: 'Sri Adi Shankaracharya', url: '/history/sri-adi-shankaracharya', image: "/assets/images/main-page-cards/About/ABOUT-ADISHANKARA.jpg" },
    { title: 'Sage Rishyashringa', url: '/history/sage-rishyashringa', image: "/assets/images/main-page-cards/About/ABOUT-RISHYASHRINGA.jpg" },
    { title: 'The Amnaya Peethams', url: '/history/amnaya-peethams', image: "/assets/images/main-page-cards/About/ABOUT-AMNAYAPEETHAMS-FourPeethams.jpg" },
    { title: 'Activities', url: '/activities', image: "/assets/images/main-page-cards/about.jpg" },
];

export async function generateMetadata() {
  return {
      title: "About",
      description: "About: Sri Sringeri Sharada Peetham",
      openGraph: {
          title: "About",
          description: "About: Sri Sringeri Sharada Peetham",
          images: [
              {
                  url: "/public/assets/images/events_hero.jpg",
                  alt: "About",
              },
          ],
          type: "website",
      }
  };
}

export default function About() {

  const breadcrumbsSeperator = '|';

  let breadcrumbs = [
      { title: "Home", link: "/" },
      { title: "About", link: "/about" },
  ];

  return (
    <div className="bg-[var(--gray-200)]">
      {/* breadcrumbs */}
      <div className="text-xs px-5 py-2">
        <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator}/>
      </div>
      {/* Submenu Tab Content */}
      <LandingPageCards subLinks={subLinks} color={'var(--about)'}/>
    </div>
  );
}