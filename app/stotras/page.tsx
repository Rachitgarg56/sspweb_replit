import PageContent from "./PageContent";
import React from 'react';

export async function generateMetadata() {
    return {
        title: "Stotras",
        description: "Stotras: Sri Sringeri Sharada Peetham",
        openGraph: {
            title: "Stotras",
            description: "Stotras: Sri Sringeri Sharada Peetham",
            images: [
                {
                    url: "/assets/images/events_hero.jpg",
                    alt: "Stotras",
                },
            ],
            type: "website",
        }
    };
}

export default function Page() {
  return (
      <PageContent/>
  );
}
