import React from "react";
import BreadCrumbs from "../../../app/components/BreadCrumbs";
import Calendar from "@/app/components/Calendar";

export async function generateMetadata() {
  return {
      title: "Events Calendar",
      description: "Events Calender for Sri Sringeri Sharada Peetham",
      openGraph: {
          title: "Events Calendar",
          description: "Events Calender for Sri Sringeri Sharada Peetham",
          images: [
              {
                  url: "/assets/images/og-images/sringeri-og-image.png",
                  alt: "Events Calendar",
              },
          ],
          type: "website",
      }
  };
}

export default function CalendarPage() {

  let breadcrumbs = [
    {title: "Home", link: "/"},
    {title: "Events", link: "/events", desktopClick: false},
    {title: "Calendar", link: "/events/calendar"},
  ]
  
  const breadcrumbsSeperator = '|';

  return(
    <div className="bg-[var(--gray-100)] py-8 px-4 max-md:px-2">
      <div className="mx-auto max-w-[1175px] w-full flex flex-col gap-6 md:mb-12">
        
        <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator}/>
        
        <Calendar/>

      </div>
    </div>

  )

};
