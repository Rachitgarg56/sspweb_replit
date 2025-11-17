import BreadCrumbs from "../../components/BreadCrumbs";
import React, { cache } from "react";
import { API_URL } from "@/config/api";
import { Metadata } from "next";
import { getFirstNWords, stripHTML } from "@/utils/helpers";
import { SidebarItem } from "@/app/src/types";
import DropdownSidebar from "@/app/components/DropdownSidebar";
import {DropdownSidebarMobile} from "@/app/components/DropdownSidebarMobile";
// import SocialIcons from '@/app/events/upcoming-events/SocialIcons';

interface Props {
  params: Promise<{ slug: string }>;
}

// const getPageData = cache(async () => {
//   const res = await fetch(`${API_URL}tp/history/amnaya-peethams`);
//   const pageData = await res.json();
//   return pageData;
// });

export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const pageData = await getPageData();
  return {
    title: "Extra Form",
    description: getFirstNWords(stripHTML("As part of the Harihara Namamrita scheme, devotees who have written the divine names of Bhagavan Sri Rama & Bhagavan Parama Shiva 108 times on the prescribed main form (available at https://www.srisharadapeetham.com/hariharanamamrita), can use the above extra form to print (back-to-back on a single sheet) and continue to write the divine names of Shiva and […]"), 50),
    openGraph: {
        title: "Extra Form",
        description: getFirstNWords(stripHTML("As part of the Harihara Namamrita scheme, devotees who have written the divine names of Bhagavan Sri Rama & Bhagavan Parama Shiva 108 times on the prescribed main form (available at https://www.srisharadapeetham.com/hariharanamamrita), can use the above extra form to print (back-to-back on a single sheet) and continue to write the divine names of Shiva and […]"), 50),
        images: [
        {
          url: "/assets/images/og-images/temples-intro.jpg",
          alt: "Extra Form",
        },
      ],
      type: "website",
    },
  };
}

export default async function Page() {
//   const pageData = await getPageData();

  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "Harihara Namamritam", link: "/hariharanamamrita" },
    { title: "Extra Forms", link: "/hariharanamamrita/extraforms" },
  ];

  const breadcrumbsSeperator = "|";
  const sidebarData: SidebarItem[] = [
      { title: "Harihara Namamritam", link: "/hariharanamamrita" },
      { title: "Extra Forms", link: "/hariharanamamrita/extraforms" },
    ];

  return (
    <div className="p-4 bg-[--gray-100]">
      <div className="max-w-[1175px] m-auto flex flex-col gap-4">
        <div className="">
          <div className="md:ml-8 mt-4">
          <BreadCrumbs
            breadcrumbs={breadcrumbs}
            breadcrumbsSeperator={breadcrumbsSeperator}
          />
        </div>
        <div className="md:flex md:space-x-6 page-main-inner-container flex gap-6 relative max-lg:flex-col pb-14 my-8">
            <DropdownSidebar data={sidebarData} highlight="var(--pilgrim)" />
            <div className="flex flex-col gap-6 w-full py-4 px-12 bg-[#FFFFFF] max-lg:px-6 max-[462px]:px-4">
              <DropdownSidebarMobile
                data={sidebarData}
                bgColor="var(--pilgrim)"
                title={"Extra Forms"}
                bgHover="var(--pilgrim-hover)"
              />
              <h1 className="text-center text-[var(--events)] text-[37px] max-sm:text-2xl font-pt-serif">
              Extra Form
            </h1>

            <hr/>

            <div className="">
              <div className="page-content xprose pilgrim mx-auto lg:px-40">
                <p>
                  <a
                    href="https://files.sringeri.net/assets/documents/sringeri/Extra_Form_Harihara_Namamrita.pdf"
                    target="_blank"
                  >
                    EXTRA FORM – PRINTABLE VIEW
                  </a>
                  <a
                    href="https://files.sringeri.net/assets/documents/sringeri/Extra_Form_Harihara_Namamrita.pdf"
                    download
                  >
                    Download
                  </a>
                </p>
                <p>
                  As part of the Harihara Namamrita scheme, devotees who have
                  written the divine names of Bhagavan Sri Rama & Bhagavan
                  Parama Shiva 108 times on the prescribed main form (available
                  at-
                  <a href="https://www.sringeri.net/hariharanamamrita">
                    https://www.sringeri.net/hariharanamamrita
                  </a>
                  ), can use the above extra form to print (back-to-back on a
                  single sheet) and continue to write the divine names of Shiva
                  and Rama.
                </p>
                <p>
                  Devotees who write in the extra forms are requested to
                  maintain a collection of these written extra forms, and send
                  them as a bunch to the following address in the beginning of
                  March 2025.
                </p>
                <p>
                  Harihara Namamrita Scheme, <br />
                  Dakshinamnaya Sri Sharada Peetham, <br />
                  Sringeri, <br />
                  Chikkamagaluru – 577139. <br />
                </p>
              </div>
            </div>
            {/* <SocialIcons/> */}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
