import heroImage from "../../public/assets/images/events_hero.jpg";
import PageHero from "../components/PageHero";
import { SubLink } from "../components/NavLinks";
import SubLinks from "../components/SubLinks";
import SubNavDropdown from "../components/SubNavDropdown";

const subLinks: SubLink[] = [
    { title: 'Online Services: Home', url: '/online-services', showOnDesktop: false },
    { title: 'Online Seva', url: 'https://seva.sringeri.net/', externalLink: true },
    { title: "Accomodation", url: "https://yatri.sringeri.net/rooms/reserve", externalLink: true },
    { title: "Donation", url: "https://donate.sringeri.net/", externalLink: true },
    { title: 'Online Bookstore', url: 'https://books.sringeri.net/', externalLink: true },
    // { title: 'Book Fastline Seva', url: 'https://fastline.sringeri.net/sevas-gnr', externalLink: true },
];

export default function ResourceLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            {/* Hero Section */}
            <PageHero image={heroImage} pageTitle={"Online Services"} />

            {/* Laptop SubNav */}
            {/* Submenu Tabs */}
            <div className="bg-[var(--online-services)] relative hidden md:block">
            <div className="container mx-auto flex justify-center space-x-12 max-lg:space-x-4 text-white uppercase font-inter text-sm">
                    <SubLinks subLinks={subLinks} color='var(--online-services-hover)' />
                </div>
            </div>
            {/* Mobile SubNav */}
            <SubNavDropdown subLinks={subLinks} color="var(--online-services)" colorHover="var(--online-services-hover)"/>
            {children}
        </div>
    );
}
