import heroImage from "../../public/assets/images/pilgrim_hero.jpg";
import PageHero from "../components/PageHero";
import { SubLink } from "../components/NavLinks";
import SubLinks from "../components/SubLinks";
import SubNavDropdown from "../components/SubNavDropdown";

const subLinks: SubLink[] = [
    { title: 'Pilgrim Info: Home', url: '/pilgrim-info', showOnDesktop: false },
    { title: 'Aksharabhyasa', url: '/sevas/aksharabhyasa' },
    { title: 'Temple Timings', url: '/pilgrim-info/temple-timings', heroImage: '/assets/images/heroImages/PilgrimInfo/PILGRIMINFO-TEMPLETIMINGS.jpg' },
    { title: 'Travel & Weather', url: '/pilgrim-info/travel-and-weather', heroImage: '/assets/images/heroImages/PilgrimInfo/PILGRIMINFO-TRAVEL&WEATHER.jpg' },
    // { title: "Do's & Dont's", url: "/pilgrim-info/dos-and-donts", heroImage: '/assets/images/heroImages/PilgrimInfo/PILGRIMINFO-DOSDONTS.jpg' },
    { title: "Facilities", url: "/pilgrim-info/pilgrim-facilities", heroImage: '/assets/images/heroImages/PilgrimInfo/PILGRIMINFO-FACILITIES.jpg' },
    { title: 'Temples', url: '/temples', heroImage: '/assets/images/heroImages/PilgrimInfo/PILGRIMINFO-TEMPLES.jpg' },
    { title: 'Darshan Schedule', url: '/schedule' },
];

export default function PilgrimLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[var(--gray-100)]">
            {/* Hero Section */}
            <PageHero image={heroImage} pageTitle={"Pilgrim Info"} />

            {/* Laptop Events SubNav */}
            {/* Submenu Tabs */}
            <div className="bg-[var(--pilgrim)] relative hidden md:block">
                <div className="container mx-auto flex justify-center space-x-12 max-lg:space-x-4 text-white uppercase font-inter text-sm">
                    <SubLinks subLinks={subLinks} color='var(--pilgrim-hover)' />
                </div>
            </div>
            {/* Mobile Events SubNav */}
            <SubNavDropdown subLinks={subLinks} color='var(--pilgrim)' colorHover='var(--pilgrim-hover)' />
            {children}
        </div>
    );
}
