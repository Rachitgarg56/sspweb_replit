import PageContent from "./PageContent";
import React from 'react';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata() {
    return {
        title: "Stotras Collection",
        description: "Stotras Collection: Sri Sringeri Sharada Peetham",
        openGraph: {
            title: "Stotras Collection",
            description: "Stotras Collection: Sri Sringeri Sharada Peetham",
            images: [
                {
                    url: "/assets/images/events_hero.jpg",
                    alt: "Stotras Collection",
                },
            ],
            type: "website",
        }
    };
}

export default function Page({ params }: PageProps) {
  return (
      <PageContent params={params}/>
  );
}
