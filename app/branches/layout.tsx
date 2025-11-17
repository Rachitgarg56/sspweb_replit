import heroImage from "../../public/assets/images/events_hero.jpg";
import PageHero from "../components/PageHero";
import { SubLink } from "../components/NavLinks";
import SubLinks from "../components/SubLinks";
import BreadCrumbs from "../components/BreadCrumbs";
import SubNavDropdown from "../components/SubNavDropdown";

const subLinks: SubLink[] = [
    {title: 'Contact: Home', url: '/contact', showOnDesktop: false},
    {title: 'Departments', url: '/contact/departments', heroImage: '/assets/images/heroImages/Contact/CONTACT-DEPARTMENTS.jpg'},
    {title: 'Location', url: '/contact/location', heroImage: '/assets/images/heroImages/Contact/CONTACT-LOCATION.jpg'},
    {title: 'Branches', url: '/branches', heroImage: '/assets/images/heroImages/Contact/CONTACT-BRANCHES.jpg'}
  ];

export default function Layout({ children }: { children: React.ReactNode }) {
    let breadcrumbs = [
        { title: "Home", link: "/" },
        { title: "Contact", link: "/contact", desktopClick: false },
        { title: "Branches", link: "/branches" },
    ];
      
    const breadcrumbsSeperator = '|';

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
            
            <div className="">            
                <section className="p-4 bg-[--gray-100]">
                    <div className="max-w-[1175px] m-auto flex flex-col gap-4">
                        <div className="mt-4">
                            <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator} />
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="min-w-72 max-lg:hidden"></div>
                            {/* <h1 className="text-center text-4xl mb-5 text-[var(--resources)] w-full">Downloads</h1> */}
                        </div>
                        
                        <div className="page-main-inner-container flex gap-6 relative max-lg:flex-col pb-14">

                            {/* main section code */}
                            {children}
            
                        </div>
                    </div>
                </section>

            </div>

        </div>
    );
}
