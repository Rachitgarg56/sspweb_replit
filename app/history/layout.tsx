import heroImage from "../../public/assets/images/about_hero.jpg";
import PageHero from "../components/PageHero";
import { SubLink } from "../components/NavLinks";
import SubLinks from "../components/SubLinks";
import SubNavDropdown from "../components/SubNavDropdown";

const subLinks: SubLink[] = [
    { title: 'About: Home', url: '/about', showOnDesktop: false },
    { title: 'History', url: '/history', heroImage: '/assets/images/heroImages/About/ABOUT-HISTORY-ADISHANKARACHARYA-Sri-Shankara-at-Sringeri-Zoomed.jpg' },
    { title: 'Guru Parampara', url: '/jagadgurus', heroImage: '/assets/images/heroImages/About/ABOUT-GURUPARAMPARA.jpg' },
    { title: 'Sri Adi Shankaracharya', url: '/history/sri-adi-shankaracharya', heroImage: '/assets/images/heroImages/About/ABOUT-ADISHANKARA.jpg' },
    { title: 'Sage Rishyashringa', url: '/history/sage-rishyashringa', heroImage: '/assets/images/heroImages/About/ABOUT-RISHYASHRINGA.jpg' },
    { title: 'The Amnaya Peethams', url: '/history/amnaya-peethams', heroImage: '/assets/images/heroImages/About/ABOUT-AMNAYAPEETHAMS-FourPeethams.jpg' },
    { title: 'Activities', url: '/activities', heroImage: '/assets/images/heroImages/About/ABOUT-RISHYASHRINGA-Maharshi_Rishyashringa_Shot_3-copy.jpg' },
];


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            {/* Hero Section */}
            <PageHero image={heroImage} pageTitle={"About Us"} />

            {/* Laptop SubNav */}
            {/* Submenu Tabs */}
            <div className="bg-[var(--about)] relative hidden md:block">
                <div className="container mx-auto flex justify-center space-x-12 max-lg:space-x-4 text-white uppercase font-inter text-sm">
                    <SubLinks subLinks={subLinks} color='var(--about-hover)' />
                </div>
            </div>
            {/* Mobile SubNav */}
            <SubNavDropdown subLinks={subLinks} color="var(--about)" colorHover="var(--about-hover)"/>
            {children}
        </div>
    );
}
