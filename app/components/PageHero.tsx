'use client'
import Image, { StaticImageData } from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { API_URL } from '@/config/api';

interface PageHeroProps {
  image: StaticImageData | string;
  pageTitle: string;
}

export default function PageHero({ image, pageTitle }: PageHeroProps) {
  const pathname = usePathname();
  const [heroImage, setHeroImage] = useState('');

  useEffect(() => {
    async function fetchHeroImage() {
      const res = await fetch(API_URL + 'pageHero');
      const heroImages = await res.json();
      const img = heroImages.find(im => (('/' + im.link) == pathname))?.imagePath;
      setHeroImage(img);
    }
    fetchHeroImage();
  }, [pathname]);

  return (
    <div className="relative">
      <Image
        src={
          heroImage
            ? 'https://files.sringeri.net/' + heroImage
            : image || '/assets/images/events_hero.jpg'
        }
        alt={pageTitle}
        layout="responsive"
        width={1600}
        height={600}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#4d270a] bg-opacity-30 pl-5 md:pl-12 flex items-center">
        <h1 className="text-white text-[20px] md:text-4xl font-pt-serif">{pageTitle}</h1>
      </div>
    </div>
  );
}
