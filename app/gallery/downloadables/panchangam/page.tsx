import PanchangamContent from '@/app/components/PanchamgamContent'
import React from 'react'

export async function generateMetadata() {
  return {
      title: "Panchangam",
      description: "Panchangam: Sri Sringeri Sharada Peetham",
      openGraph: {
          title: "Panchangam Calendar",
          description: "Panchangam: Sri Sringeri Sharada Peetham",
          images: [
              {
                  url: "/assets/images/og-images/sringeri-og-image.png",
                  alt: "Panchangam Calendar",
              },
          ],
          type: "website",
      }
  };
}

const page = () => {
  return (
    <PanchangamContent/>
  )
}

export default page