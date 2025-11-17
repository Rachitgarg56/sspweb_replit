import { Metadata } from 'next';
import PageContent from './PageContent'
import { cache } from 'react';
import { API_URL } from '@/config/api';
import { getFirstNWords } from '@/utils/helpers';

interface Props {
  params: Promise<{ slug: string[] }>; 
}

const getCourse = cache(async (slugStr: string) => {
    const res = await fetch(`${API_URL}anugraha-bhashanams/${slugStr}`);
    if (!res.ok) throw new Error("Failed to fetch course data");
    const data = await res.json();
    return data;
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugStr = slug?.join('/');
  let course;
  if (slugStr) {
    course = await getCourse(slugStr);
  }

  return {
      title: course?.title ? course?.title : 'Anugraha Bhashanams Archive - Sri Sringeri Sharada Peetham',
      description: course?.description ? getFirstNWords(course?.description, 50) : '',
      openGraph: {
          title: course?.title ? course?.title : 'Anugraha Bhashanams Archive - Sri Sringeri Sharada Peetham',
          description: course?.description ? getFirstNWords(course?.description, 50) : '',
          images: [
              {
                  url: !course?.images?.length ? "/assets/images/resources_hero.jpg" : `https://files.sringeri.net/${course.images[0]}`,
                  alt: course?.title ? course?.title : 'Anugraha Bhashanams Archive - Sri Sringeri Sharada Peetham',
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

