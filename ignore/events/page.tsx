import Image from "next/image";
import Link from "next/link";
import { navLinks, NavLink, SubLink } from '../../app/components/NavLinks';
const subLinks: SubLink[] = [
  { title: 'Upcoming Events', url: '/events/upcoming-events' },
  { title: 'Past Events', url: '/events/past-events' },
  { title: 'Calendar', url: '/events/calendar' },
]

export default function Events() {
  return (
    <div className="bg-[var(--gray-200)]">
      {/* breadcrumbs */}
      <div className="text-xs px-5 py-2">
          Home / Events
      </div>
      {/* Submenu Tab Content */}
      <div>
        <div className="md:hidden block">
          {/* subPageCards */}
          <div className="bg-[var(--gray-200)] p-4 grid grid-cols-2 gap-4">
            {subLinks.map((sl) => (
              <Link href={sl.url} key={sl.url}
                className="block text-white bg-cover bg-center mb-2 min-h-32"
                style={{ backgroundImage: "url('/assets/images/event-square.jpg')" }}>
                <p className="bg-opacity-30 bg-black h-full py-2 px-4">{sl.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}