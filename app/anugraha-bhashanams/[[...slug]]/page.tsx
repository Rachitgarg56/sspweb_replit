import { Metadata } from 'next';
import PageContent from './PageContent'

interface Props {
  params: Promise<{ slug: string[] }>; 
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
      title: 'Anugraha Bhashanams Archive - Sri Sringeri Sharada Peetham',
      description: '',
      openGraph: {
          title: 'Anugraha Bhashanams Archive - Sri Sringeri Sharada Peetham',
          description: '',
          images: [
              {
                  url: "/assets/images/resources_hero.jpg",
                  alt: 'Anugraha Bhashanams Archive - Sri Sringeri Sharada Peetham',
              },
          ],
          type: "website",
      }
  };
}

export default function benedictoryCourses({ params }: Props) {
  return (
    <PageContent />
  )
}

