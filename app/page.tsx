export const dynamic = "force-dynamic";
import AnnouncementsSection from "./components/AnnouncementsSection";
import { API_URL } from "@/config/api";
import { Announcement, Event } from "./src/types";
import HomeHero from './components/HomeHero';
import EventsCalendarSection from "./components/EventsCalendarSection";
import SideHeroSection from "./components/SideHeroSection";

function formatDate(dateString: string) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const date = new Date(dateString);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayOfWeek}, ${day} ${month} ${year}`;
}

export async function generateMetadata() {
  return {
      title: "Sri Sringeri Sharada Peetham",
      description: "Jagadguru Shankaracharya Maha Samsthanam, Sringeri",
      openGraph: {
          title: "Sri Sringeri Sharada Peetham",
          description: "Jagadguru Shankaracharya Maha Samsthanam, Sringeri",
          images: [
              {
                  url: "/assets/images/hero-1-web.jpg",
                  alt: "Sri Sringeri Sharada Peetham",
              },
          ],
          type: "website",
      }
  };
}

export default async function Home() {
  const announcements: Announcement[] = await fetch(
    API_URL + "announcement"
  ).then((res) => res.json());
  const events: Event[] = await fetch(API_URL + "events").then((res) =>
    res.json()
  );
  const today = new Date().toISOString().split("T")[0];
  
  let tithi;
  try {
    tithi = await fetch("https://dssp.lcpl.in/api/todayDetails/" + today).then((res) =>
      res.json()
    );
  } catch (err) {
    console.error(err)
  }

  async function getHeroImages() { 
    const res = await fetch(`${API_URL}homepage`);
    const data = await res.json();
    return data;
  }
  const { heroSlidesData, ytData, homepageActions } = await getHeroImages();

  return (
    <div>
      {/* hero */}
      <HomeHero heroSlidesData={heroSlidesData} ytData={ytData} />

      {/* side hero */}
      <SideHeroSection homepageActions={homepageActions}/>

      {/*announcements  */}
      <AnnouncementsSection announcements={announcements} />

      {/* date from API */}
      <div
        id="tithi"
        className={`${(tithi?.occasion?.trim() !== '' || tithi?.occasionK?.trim() !== '') ? 'h-fit py-4' : 'h-[150px] sm:h-[196px]'} text-lg text-center flex flex-col items-center justify-center title text-[var(--brown-medium)] bg-cover bg-center bg-no-repeat px-4`}
        style={{
          backgroundImage: "url('../assets/images/background-writing-web.jpg')",
        }}
      >
        <p className="max-sm:text-[13px] max-sm:leading-5 text-[21px] font-noto-sans mb-2">{tithi?.todayWebsiteKannada} </p>
        <p className="font-pt-serif max-sm:text-[13px] max-sm:leading-5 max-sm:mx-4 text-[21px]">{tithi?.todayWebsiteEnglish}</p>
        <p className={`text-[var(--pilgrim)] max-sm:text-[9px] font-inter uppercase font-semibold text-[13px] ${((tithi?.occasion.trim() === '') && (tithi?.occasionK.trim() === '')) ? 'pt-2 sm:pt-4' : 'py-2'}`}>
          {formatDate(today)}
        </p>
        <p className="font-pt-serif max-sm:text-[13px] max-sm:leading-5 text-[21px]">{tithi?.occasion}</p>
        <p className="font-pt-serif max-sm:text-[13px] max-sm:leading-5 text-[21px]">{tithi?.occasionK}</p>
      </div>

      {/* Events calendar section */}
      <EventsCalendarSection events={events}/>
      
    </div>
  );
}
