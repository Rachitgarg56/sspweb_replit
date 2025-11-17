import Link from "next/link";
// import { navLinks } from '../components/NavLinks';
import heroImage from "../../public/assets/images/events_hero.jpg";
import PageHero from "../../app/components/PageHero";
import { SubLink } from "../../app/components/NavLinks";
import SubLinks from "../../app/components/SubLinks";

const subLinks: SubLink[] = [
    { title: 'Upcoming Events', url: '/events/upcoming-events' },
    { title: 'Past Events', url: '/events/past-events' },
    { title: 'Calendar', url: '/events/calendar' },
];

export default function EventLayout({ children }: { children: React.ReactNode }) {
    // console.log(navLinks);
    // const subLinks = navLinks.find(link => link.slug === "events")?.subLinks || [];

    return (
        <div>
            {/* Hero Section */}
            <PageHero image={heroImage} pageTitle={"Events"} />

            {/* Laptop Events SubNav */}
            {/* Submenu Tabs */}
            <div className="bg-[var(--events)] relative hidden md:block">
            <div className="container mx-auto flex justify-center space-x-12 max-lg:space-x-4 text-white uppercase font-inter text-sm">
                    <SubLinks subLinks={subLinks} color='var(--events-hover)' />
                </div>
            </div>
            {/* Mobile SubNav */}
            <div className="md:hidden block">
                <div className="bg-[var(--events)] p-5 uppercase text-white text-sm">
                    Events: Home
                </div>
            </div>
            {children}
        </div>
    );
}
