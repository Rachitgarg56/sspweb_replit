import heroImage from "../../public/assets/images/events_hero.jpg";
import PageHero from "../components/PageHero";
import { SubLink } from "../components/NavLinks";
import SubLinks from "../components/SubLinks";
import SubNavDropdown from "../components/SubNavDropdown";

const subLinks: SubLink[] = [
    { title: 'Resources: Home', url: '/resources', showOnDesktop: false },
    { title: 'Stotras', url: '/stotras', heroImage: '/assets/images/heroImages/Resources/RESOURCES-STOTRAS.jpg' },
    { title: 'Benedictory Discourses', url: '/anugraha-bhashanams', heroImage: '/assets/images/heroImages/Resources/RESOURCES-DISCOURSES.jpg' },
    { title: 'Bhajans', url: 'https://bhajan.sringeri.net/', externalLink: true, heroImage: '/assets/images/heroImages/Resources/RESOURCES-BHAJANS.jpg' },
    { title: 'Panchangam', url: '/gallery/downloadables/panchangam', heroImage: '/assets/images/heroImages/Resources/RESOURCES-PANCHANGAM.jpg' },
    { title: 'Downloads', url: '/gallery', heroImage: '/assets/images/heroImages/Resources/RESOURCES-DOWNLOADS.jpg' },
];

export default function ResourceLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            {/* Hero Section */}
            <PageHero image={heroImage} pageTitle={"Resources"} />

            {/* Laptop SubNav */}
            {/* Submenu Tabs */}
            <div className="bg-[var(--resources)] relative hidden md:block">
            <div className="container mx-auto flex justify-center space-x-12 max-lg:space-x-4 text-white uppercase font-inter text-sm">
                    <SubLinks subLinks={subLinks} color='var(--resources-hover)' />
                </div>
            </div>
            {/* Mobile SubNav */}
            <SubNavDropdown subLinks={subLinks} color="var(--resources)" colorHover="var(--resources-hover)"/>
            {children}
        </div>
    );
}
