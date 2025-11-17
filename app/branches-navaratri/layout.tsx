import heroImage from "../../public/assets/images/events_hero.jpg";
import PageHero from "../components/PageHero";
import { SubLink } from "../components/NavLinks";
import SubLinks from "../components/SubLinks";
import BreadCrumbs from "../components/BreadCrumbs";
import SubNavDropdown from "../components/SubNavDropdown";
import ListIcon from '@mui/icons-material/List';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const subLinks: SubLink[] = [
    { title: 'Events: Home', url: '/events', showOnDesktop: false },
    { title: 'Upcoming Events', url: '/events/upcoming-events', icon: <ListIcon sx={{fontSize: "20px"}}/>, heroImage: '/assets/images/heroImages/Events/EVENTS-UPCOMING.jpg' },
    { title: 'Past Events', url: '/events/past-events', icon: <ListIcon sx={{fontSize: "20px"}}/>, heroImage: '/assets/images/heroImages/Events/EVENTS-PASTEVENTS.jpg' },
    { title: 'Calendar', url: '/events/calendar', icon: <CalendarTodayIcon sx={{fontSize: "14px"}}/>, heroImage: '/assets/images/heroImages/Events/EVENTS-CALENDAR.jpg' },
    { title: 'Branches', url: '/branches-navaratri', icon: <></>, heroImage: '' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    let breadcrumbs = [
        { title: "Home", link: "/" },
        { title: "Events", link: "/events", desktopClick: false },
        { title: "Branches", link: "/branches-navaratri" },
    ];
      
    const breadcrumbsSeperator = '|';

    return (
        <div className="">
            {/* Hero Section */}
            <PageHero image={heroImage} pageTitle={"Events"} />

            {/* Laptop SubNav */}
            {/* Submenu Tabs */}
            <div className="bg-[var(--events)] relative hidden md:block">
            <div className="container mx-auto flex justify-center space-x-12 max-lg:space-x-4 text-white uppercase font-inter text-sm">
                    <SubLinks subLinks={subLinks} color="var(--events-hover)" />
                </div>
            </div>
            {/* Mobile SubNav */}
            <SubNavDropdown subLinks={subLinks} color="var(--events)" colorHover="var(--events-hover)"/>
            
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
