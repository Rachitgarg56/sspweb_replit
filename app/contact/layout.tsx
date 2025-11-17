import heroImage from "../../public/assets/images/events_hero.jpg";
import PageHero from "../components/PageHero";
import { SubLink } from "../components/NavLinks";
import SubLinks from "../components/SubLinks";
import SubNavDropdown from "../components/SubNavDropdown";

const subLinks: SubLink[] = [
    {title: 'Contact: Home', url: '/contact', showOnDesktop: false},
    {title: 'Departments', url: '/contact/departments', heroImage: '/assets/images/heroImages/Contact/CONTACT-DEPARTMENTS.jpg'},
    {title: 'Location', url: '/contact/location', heroImage: '/assets/images/heroImages/Contact/CONTACT-LOCATION.jpg'},
    {title: 'Branches', url: '/branches', heroImage: '/assets/images/heroImages/Contact/CONTACT-BRANCHES.jpg'}
  ];

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            {/* Hero Section */}
            <PageHero image={heroImage} pageTitle={"Contact"} />

            {/* Laptop SubNav */}
            {/* Submenu Tabs */}
            <div className="bg-[var(--contact)] relative hidden md:block">
            <div className="container mx-auto flex justify-center space-x-12 max-lg:space-x-4 text-white uppercase font-inter text-sm">
                    <SubLinks subLinks={subLinks} color="var(--contact-hover)" />
                </div>
            </div>
            {/* Mobile SubNav */}
            <SubNavDropdown subLinks={subLinks} color="var(--contact)" colorHover="var(--contact-hover)"/>
            {children}
        </div>
    );
}
