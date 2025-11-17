'use client';

import { use, useState, useEffect } from "react";
import { API_URL } from "../../../config/api";

interface PageData {
  slug: string[];
  id: string;
  title: string;
  mainMenu: string;
  subMenu: string;
  subSubMenu: string;
  breadcrumbs: any[];
  content: string;
  created_at: string;
  link: string;
}

interface PageDataProps {
  params: Promise<{ slug: string[] }>;
}


export default function EventPage({ params }: PageDataProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug.join('/');

  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getPageData() {
    try {
      const response = await fetch(`${API_URL}tp/${slug}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch page data for slug: ${slug}, status: ${response.status}`);
      }
      const data: PageData = await response.json();
      setPageData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPageData();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <section className="p-4 bg-[#F7F2EC]">
        <div className="max-w-[1175px] m-auto flex flex-col gap-4">
          <div className="page-main-inner-container flex gap-6 relative max-md:flex-col">
            <div className="bg-[#FFFFFF] w-full flex flex-col gap-4 py-6 px-14 max-sm:px-6 shadow-md">
              <h1 className="text-center font-semibold text-3xl text-[#4D809F] mb-4 max-sm:text-2xl">
                {pageData?.title}
              </h1>
              <hr />
              <div className="mt-8 flex flex-col gap-12">
                {/* Render the page content using dangerouslySetInnerHTML */}
                <div
                  className="page-content xprose mx-auto" 
                  dangerouslySetInnerHTML={{ __html: pageData?.content || "" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
