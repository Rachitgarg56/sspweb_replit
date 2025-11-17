'use client'
 
import BreadCrumbs from '../../../components/BreadCrumbs';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import { API_URL } from "../../../../config/api";

interface Branch {
  title: string;
  content: ReactNode;
}
  
const asideIndexes = [
  {title: "Maharashtra", url: "/branches/maharashtra", subLinks: [
    {title: "Pune", url: "/branches/maharashtra/pune"},
    {title: "Mumbai", url: "/branches/maharashtra/mumbai", subLinks: [
      {title: "Actvities", url: "/branches/maharashtra/mumbai/activities"},
    ]},
    {title: "Nagpur", url: "/branches/maharashtra/nagpur"},
  ]},
];
  

export default function Page() {
    const pathname = usePathname();
    const params = useParams();
  
    const breadcrumbs = [
      { title: "Home", link: "/" },
      { title: "Branches", link: "/branches" },
    ]
    const breadcrumbsSeperator = "|"

    const [branchData, setBranchData] = useState<Branch>({
      title: "",
      content: "",
    });

    useEffect(() => {
      async function getBranch() {
        const slug = (params.slug as string[] | undefined)?.join("/") ?? "";
        // const slug = params.slug?.[0] ?? ""; 
        const res = await fetch(`${API_URL}pilgrim-info/branches/${slug}`);
        const parsedRes = await res.json();
        setBranchData(parsedRes);
      }

      if(params?.slug?.length) {
        getBranch();
      }
    }, []);

    return (
      <section className="p-4 bg-[--gray-100]">
        <div className="max-w-[1175px] m-auto flex flex-col gap-4">
          <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator} />
          <div className="page-main-inner-container flex gap-6 relative max-lg:flex-col pb-14">

            {/* aside code */}
            <aside className="flex flex-col gap-6 min-w-72">
              <div className="bg-[#FFFFFF] p-6 flex flex-col gap-6 sticky top-0 max-[462px]:p-4">
                <h2 className="text-[#7e6f5c] font-semibold flex items-center gap-1">
                  Branches
                </h2>
                <hr />
                <ul className="flex flex-col items-start gap-2 max-lg:flex-row max-lg:gap-8 max-lg:flex-wrap max-[462px]:gap-4">
  {asideIndexes.map((obj) => {
    const isActive = obj.url === pathname;
    return (
      <li key={obj.url} className={isActive ? 'text-[var(--pilgrim)]' : "text-black"}>
        <Link href={obj.url}>{obj.title}</Link>
        {/* Second level */}
        {obj.subLinks && (
          <ul className="flex flex-col items-start gap-2 max-lg:flex-row max-lg:gap-8 max-lg:flex-wrap max-[462px]:gap-4 ml-6 mt-2">
            {obj.subLinks.map((subLink) => {
              const isActive = subLink.url === pathname;
              return (
                <li key={subLink.url} className={isActive ? 'text-[var(--pilgrim)]' : "text-black"}>
                  <Link href={subLink.url}>{subLink.title}</Link>
                  {/* Third level */}
                  {subLink.subLinks && (
                    <ul className="flex flex-col items-start gap-2 max-lg:flex-row max-lg:gap-8 max-lg:flex-wrap max-[462px]:gap-4 ml-6 mt-2">
                      {subLink.subLinks.map((nestedSubLink) => {
                        const isActive = nestedSubLink.url === pathname;
                        return (
                          <li key={nestedSubLink.url} className={isActive ? 'text-[var(--pilgrim)]' : "text-black"}>
                            <Link href={nestedSubLink.url}>{nestedSubLink.title}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  })}
</ul>

              </div>
            </aside>
            {/* main content code */}
            <div className="flex flex-col gap-6 w-full py-4 px-12 bg-[#FFFFFF] max-lg:px-6 max-[462px]:px-4">
              <h2 className='text-center text-[var(--pilgrim)] text-4xl'>{branchData.title}</h2>
              <hr className="my-2" />
                <div className='page-content prose w-full max-w-none' dangerouslySetInnerHTML={{__html: branchData.content || ""}}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

