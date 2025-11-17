import Image from "next/image";
import Link from "next/link";
import { navLinks, NavLink, SubLink } from '../../app/components/NavLinks';
import BreadCrumbs from "../components/BreadCrumbs";
import LandingPageCards from "../components/LandingPageCards";
const subLinks: SubLink[] = [
  { title: 'Upcoming Events', url: '/events/upcoming-events', image: "/assets/images/main-page-cards/Events/Events-UpcomingEvents.jpg" },
  { title: 'Past Events', url: '/events/past-events', image: "/assets/images/main-page-cards/Events/EVENTS-PASTEVENTS.jpg" },
  { title: 'Calendar', url: '/events/calendar', image: "/assets/images/main-page-cards/Events/EVENTS-CALENDAR.jpg" },
]

export async function generateMetadata() {
  return {
      title: "Events in Sringeri",
      description: "Events in Sri Sringeri Sharada Peetham",
      openGraph: {
          title: "Events in Sringeri",
          description: "Events in Sri Sringeri Sharada Peetham",
          images: [
              {
                  url: "/assets/images/events/event-placeholder.jpg",
                  alt: "Events in Sringeri",
              },
          ],
          type: "website",
      }
  };
}

export default function Events() {
  
  const breadcrumbsSeperator = '|';

  let breadcrumbs = [
      { title: "Home", link: "/" },
      { title: "Events", link: "/events" },
  ];

  return (
    <div className="bg-[var(--gray-200)]">
  
      {/* breadcrumbs */}
      <div className="text-xs px-5 py-2">
        <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator}/>
      </div>
  
      {/* Submenu Tab Content */}
      <LandingPageCards subLinks={subLinks} color={'var(--events)'}/>
    </div>
  );
}
