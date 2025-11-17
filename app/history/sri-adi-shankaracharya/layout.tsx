import { SubLink } from "../../components/NavLinks";
import BreadCrumbs from "../../components/BreadCrumbs";

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
    const breadcrumbs = [
        { title: "Home", link: "/" },
        { title: "About", link: "/about", desktopClick: false },
        { title: "Sri Adi Shankaracharya", link: "/history/sri-adi-shankaracharya" },
    ]  
    const breadcrumbsSeperator = "|"

    return (
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
    );
}
