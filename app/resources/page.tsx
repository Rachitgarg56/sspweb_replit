import Image from "next/image";
import Link from "next/link";
import { navLinks, NavLink, SubLink } from '../components/NavLinks';
import BreadCrumbs from "../components/BreadCrumbs";
import LandingPageCards from "../components/LandingPageCards";

const subLinks: SubLink[] = [
  { title: 'Stotras', url: '/stotras', image: "/assets/images/main-page-cards/Resources/RESOURCES-STOTRAS.jpg" },
  { title: 'Benedictory Discourses', url: '/anugraha-bhashanams', image: "/assets/images/main-page-cards/Resources/RESOURCES-DISCOURSES.jpg" },
  { title: 'Bhajans', url: 'https://bhajan.sringeri.net/', externalLink: true, image: "/assets/images/main-page-cards/Resources/RESOURCES-BHAJANS.jpg" },
  { title: 'Panchangam', url: '/gallery/downloadables/panchangam', image: "/assets/images/main-page-cards/Resources/RESOURCES-PANCHANGAM.jpg" },
  { title: 'Downloads', url: '/gallery', image: "/assets/images/main-page-cards/Resources/RESOURCES-DOWNLOADS.jpg" },
];

export async function generateMetadata() {
  return {
      title: "Resources",
      description: "Resources: Sri Sringeri Sharada Peetham",
      openGraph: {
          title: "Resources",
          description: "Resources: Sri Sringeri Sharada Peetham",
          images: [
              {
                  url: "/assets/images/events_hero.jpg",
                  alt: "Resources",
              },
          ],
          type: "website",
      }
  };
}

export default function Resources() {

  const breadcrumbsSeperator = '|';

  let breadcrumbs = [
      { title: "Home", link: "/" },
      { title: "Resources", link: "/resources" },
  ];

  return (
    <div className="bg-[var(--gray-200)]">
      {/* breadcrumbs */}
      <div className="text-xs px-5 py-2">
        <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator}/>
      </div>
      {/* Submenu Tab Content */}
      <LandingPageCards subLinks={subLinks} color={'var(--resources)'}/>
    </div>
  );
}