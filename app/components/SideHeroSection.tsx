import React from 'react'
import HomeCard from './HomeCard';

const homeCards = [
    {
      id: 1,
      title: "Upcoming & Past Events",
      image: "../assets/images/feature-events-web.jpg",
      description:
        "Explore the event calendar — view past events and see what's coming up next. Stay connected with our complete event history and schedule.",
      buttonText: "View All Events",
      color: "#FFA500",
      hColor: "#F49600",
      url1: "/events/past-events",
      url2: "/events",
    },
    {
      id: 2,
      title: "Prepare for your Pilgrimage",
      image: '../assets/images/feature-pilgrimage-web.jpg',
      description: "Find essential details for your journey, including temple timings, weather updates, facilities, and helpful tips to make your pilgrimage smooth.",
      buttonText: "Learn More",
      color: "#F47527",
      hColor: "#E26114",
      url1: "/pilgrim-info/temple-timings",
      url2: "/pilgrim-info",
    },
    {
      id: 3,
      title: "Spiritual Resources",
      image: "../assets/images/feature-spiritual-resources-web.jpg",
      description:
        "Access our extensive curated collection of stotras, engaging discourses, and insightful materials designed to inspire and deepen your spiritual experience.",
      buttonText: "View Resources",
      color: "#D04843",
      hColor: "#BA3933",
      url1: "/stotras",
      url2: "/resources",
    },
];

const SideHeroSection = ({homepageActions}) => {
  return (
    <section className='relative py-12 max-sm:py-6 px-4'>
        <div className='absolute top-0 left-0 w-full h-full -z-10'>
          <figure className='relative h-40 max-md:h-32 w-full '>
            <img src="/assets/images/backgound-temple-orange-web.jpg" className='absolute max-sm:object-cover left-0 bottom-0 w-full h-[800px]' alt="bg-image" /> 
          </figure>
            {/* <img src="/assets/images/backgound-temple-orange-web.jpg" className='h-40 max-md:h-32 w-full' alt="bg-image" /> */}
            <img src="/assets/images/sringeri-tan-background-texture-4.jpg" className='h-full w-full' alt="bg-image" />
        </div>

        <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-[1175px] max-sm:gap-10 mx-auto gap-10 max-lg:gap-4">
            {homepageActions.map((card) => (
                <HomeCard key={card.orderId} card={card} />
            ))}
        </div>
    </section>
  )
}

export default SideHeroSection