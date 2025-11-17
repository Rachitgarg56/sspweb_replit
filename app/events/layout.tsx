import heroImage from "../../public/assets/images/events_hero.jpg";
import PageHero from "../../app/components/PageHero";
import { SubLink } from "../../app/components/NavLinks";
import SubLinks from "../../app/components/SubLinks";
import SubNavDropdown from "../components/SubNavDropdown";
import ListIcon from '@mui/icons-material/List';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const subLinks: SubLink[] = [
    { title: 'Events: Home', url: '/events', showOnDesktop: false },
    { title: 'Upcoming Events', url: '/events/upcoming-events', icon: <ListIcon sx={{fontSize: "20px"}}/>, heroImage: '/assets/images/heroImages/Events/EVENTS-UPCOMING.jpg' },
    { title: 'Past Events', url: '/events/past-events', icon: <ListIcon sx={{fontSize: "20px"}}/>, heroImage: '/assets/images/heroImages/Events/EVENTS-PASTEVENTS.jpg' },
    { title: 'Calendar', url: '/events/calendar', icon: <CalendarTodayIcon sx={{fontSize: "14px"}}/>, heroImage: '/assets/images/heroImages/Events/EVENTS-CALENDAR.jpg' },
];

export default function EventLayout({ children }: { children: React.ReactNode }) {

    return (
        <div>
            <PageHero image={heroImage} pageTitle={"Events"} />

            {/* Laptop Events SubNav */}
            {/* Submenu Tabs */}
            <div className="bg-[var(--events)] relative hidden md:block">
                <div className="container mx-auto flex justify-center space-x-12 max-lg:space-x-4 text-white uppercase font-inter text-sm">
                    <SubLinks subLinks={subLinks} color='var(--events-hover)' iconColor='#EA9000' />
                </div>
            </div>
            {/* Mobile SubNav */}
                <SubNavDropdown subLinks={subLinks} color="var(--events)"  colorHover="var(--events-hover)"/>
            {children}
        </div>
    );
}
