import Link from "next/link";
import BreadCrumbs from "../components/BreadCrumbs";
import { v4 as uuidv4 } from "uuid";

export async function generateMetadata() {
    return {
        title: "Online Services",
        description: "Online Services: Sri Sringeri Sharada Peetham",
        openGraph: {
            title: "Online Services",
            description: "Online Services: Sri Sringeri Sharada Peetham",
            images: [
                {
                    url: "/public/assets/images/events_hero.jpg",
                    alt: "Online Services",
                },
            ],
            type: "website",
        }
    };
}

export default function OnlineServices() {

    const breadcrumbsSeperator = '|';

    let breadcrumbs = [
        { title: "Home", link: "/" },
        { title: "Online Services", link: "/online-services" },
    ];

    const OnlineServicesCards = [
        {
            title: "Online Seva",
            description: "Book an online seva for today, or any day in the future. Can also book recurring sevas",
            link: "https://seva.sringeri.net/",
        },
        {
            title: "Accomodation",
            description: "Advance booking and reservation of a room for you and your family at Sringeri",
            link: "https://yatri.sringeri.net/rooms/reserve",
        },
        {
            title: "Donation",
            description: "Make a donation to support a wide variety of causes undertaken by the Sringeri Peetham",
            link: "https://donate.sringeri.net/",
        },
        {
            title: "Online Bookstore",
            description: "A one-stop-shop to buy books published/recommended by the Sringeri Peetham",
            link: "https://books.sringeri.net/",
        },
        // {
        //     title: "Book Fastline Seva",
        //     description: "",
        //     link: "https://fastline.sringeri.net/sevas-gnr",
        // },
    ]

    return (
        <div className="bg-[var(--gray-200)]">

            {/* Mobile Events SubNav */}
            <div className="md:hidden block">
                <div className="text-xs px-5 py-2">
                    <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator}/>
                </div>
            </div>

            <section className="cards-section px-4 py-8">
                <div className="services-cards-container max-w-[1167px] mx-auto grid grid-cols-2 gap-10 max-md:grid-cols-1">
                    {
                        OnlineServicesCards.map(card => {
                            return (
                                <div key={uuidv4()} className="card bg-white px-8 py-9 flex flex-col gap-4 justify-between shadow-md">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-[#4B3729] text-lg font-semibold">{card?.title}</h3>
                                        <p className="text-[#4B3729] text-sm">{card?.description}</p>
                                    </div>
                                    <Link target="_blank" href={card?.link}><button className="bg-[#98649D] text-white self-start px-4 
                                    py-2 text-xs rounded-sm">LEARN MORE</button></Link>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    );
}
