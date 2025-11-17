import React, { cache } from 'react';
import { API_URL } from '@/config/api';
import { Metadata } from 'next';
import { getFirstNWords, getSidebarData, stripHTML } from '@/utils/helpers';
import { SidebarItem } from '@/app/src/types';
import PageData from './PageData';

interface Props { 
    params: Promise<{ slug?: string[] }>
}

const getPageData = cache(async () => {
  const res = await fetch(`${API_URL + 'tp/history/sri-adi-shankaracharya/biography/abridged-madhaviya-shankara-digvijayam'}`);
  const pageData = await res.json();
  return pageData;
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = await getPageData();

  return {
      title: pageData?.title,
      description: getFirstNWords(stripHTML(pageData?.content), 50),
      openGraph: {
          title: pageData?.title,
          description: getFirstNWords(stripHTML(pageData?.content), 50),
          images: [
              {
                  url: pageData?.images?.length ? pageData.images[0] : '',
                  alt: pageData?.title,
              },
          ],
          type: "website",
      }
  };
}

export default async function Page({ params }: Props) {
  const pageData = await getPageData();

  const sidebarData: SidebarItem[] = await getSidebarData('/history/sri-adi-shankaracharya');

    const headingList: { id: string; title: string }[] = [];
    let counter = 1;

    const contentWithIds = pageData.content.replace(
        /<h2([^>]*)>(.*?)<\/h2>/g,
        (match, attrs, title) => {
            const id = `section-${counter++}`;
            headingList.push({ id, title: stripHTML(title).trim() }); // Remove HTML inside title
            return `<h2${attrs} id="${id}">${title}</h2>`;
        }
    );

  return (
    <PageData pageData={pageData} sidebarData={sidebarData} headingList={headingList} contentWithIds={contentWithIds} />
  );
}
