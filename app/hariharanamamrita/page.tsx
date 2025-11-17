import BreadCrumbs from "../components/BreadCrumbs";
import DropdownSidebar from "../components/DropdownSidebar";
import { DropdownSidebarMobile } from "../components/DropdownSidebarMobile";
import React, { cache } from "react";
import { API_URL } from "@/config/api";
import { Metadata } from "next";
import { getFirstNWords, stripHTML } from "@/utils/helpers";
import { SidebarItem } from "../src/types";
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
    title: "Harihara Namamritam",
    description: getFirstNWords(stripHTML("As we all know, the Suvarna Bharati Mahotsava commemorating the 50th year Sannyasa Sweekara Celebrations of our revered Jagadguru Shankaracharya Sri Sri Bharati Tirtha Mahasannidhanam is being observed. As part of the celebrations, on Vijayadashami day (Oct 12, 2024), Jagadguru Shankaracharya Sri Sri Vidhushekhara Bharati Sannidhanam inaugurated a special movement titled “Harihara Nama Amrita”. With […]"), 50),
    openGraph: {
      title:  "Harihara Namamritam",
      description: getFirstNWords(stripHTML("As we all know, the Suvarna Bharati Mahotsava commemorating the 50th year Sannyasa Sweekara Celebrations of our revered Jagadguru Shankaracharya Sri Sri Bharati Tirtha Mahasannidhanam is being observed. As part of the celebrations, on Vijayadashami day (Oct 12, 2024), Jagadguru Shankaracharya Sri Sri Vidhushekhara Bharati Sannidhanam inaugurated a special movement titled “Harihara Nama Amrita”. With […]"), 50),
      images: [
        {
          url: "/assets/images/temples-intro.jpg",
          alt:  "Harihara Namamritam",
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
                title={"Harihara Namamritam"}
                bgHover="var(--pilgrim-hover)"
              />
              <h1 className="text-center text-[var(--events)] text-[37px] max-sm:text-2xl font-pt-serif">
                Harihara Namamritam
              </h1>
              <hr/>
              <div className="">
                <div className="page-content xprose pilgrim mx-auto lg:px-40">
                  <p>
                    <a
                      href="https://files.sringeri.net/assets/documents/sringeri/MAIN_FORM_Harihara_Namamrita.pdf"
                      target="_blank"
                    >
                      MAIN FORM – PRINTABLE VIEW
                    </a>
                    <a
                      href="https://files.sringeri.net/assets/documents/sringeri/MAIN_FORM_Harihara_Namamrita.pdf"
                      download
                    >
                      Download
                    </a>
                  </p>
                  <p>
                    As we all know, the Suvarna Bharati Mahotsava commemorating
                    the 50th year Sannyasa Sweekara Celebrations of our revered
                    Jagadguru Shankaracharya Sri Sri Bharati Tirtha
                    Mahasannidhanam is being observed.
                  </p>
                  <p>
                    As part of the celebrations, on Vijayadashami day (Oct 12,
                    2024), Jagadguru Shankaracharya Sri Sri Vidhushekhara
                    Bharati Sannidhanam inaugurated a special movement titled
                    “Harihara Nama Amrita”.
                  </p>
                  <p>
                    With respect to this movement, the Sringeri Math will reach
                    out to all followers of Sanatana Dharma with a special form
                    to enable followers to write the divine names “Rama” and
                    “Shiva” 108 times in a script that is comfortable to them.
                    The intent of this movement is to distribute 1 form to each
                    follower and collect the written forms from 1 crore
                    followers before the upcoming Sri Rama Navami in April 2025.
                  </p>
                  <p>
                    Jagadguru Sri Mahasannidhanam has blessed us all by being
                    the first to write the divine names of “Rama” and “Shiva”
                    108 times on Vijayadashami day.
                  </p>
                  <p>
                    On October 29, 2024, the day of completion of 50 years of
                    Sannyasa of Sri Mahasannidhanam, the forms have been
                    distributed to some of the prominent branch Maths of
                    Sringeri and a special program is being held in various
                    branch Maths to launch the event across the country.
                  </p>
                  <h2>OBTAINING THE FORM:</h2>
                  <p>
                    The necessary papers for this Lekhana Yajna can be obtained
                    directly from Sringeri, the Math branches (from November 15,
                    2024), and the coordinators of Sri Shaankara Tattva Prasaara
                    Abhiyana.
                  </p>
                  <h2>PRINTABLE FORM:</h2>
                  <p>
                    For the convenience of devotees in remote locations or
                    abroad, the main form is also available on top of this page.
                    Simply print the pdf (back-to-back on a single sheet), write
                    the divine names of Bhagavan Parama Shiva and Bhagavan Sri
                    Rama and fill in your details.
                  </p>
                  <h2>WRITING GUIDELINES:</h2>
                  <p>
                    All are welcome to participate in this Lekhana Yajna,
                    regardless of gender, age, or nationality. Participation in
                    this holy endeavour does not involve any fee.
                  </p>
                  <p>
                    Each individual must write the names of Shiva and Rama 108
                    times each, in any of the available scripts, on the provided
                    form, according to the specified format. He or she must also
                    fill in his or her name, phone number and other details in
                    the designated spaces on the form.
                  </p>
                  <p>
                    The divine names can be written in any script of preference
                    – however, please ensure it is written in your own
                    handwriting.
                  </p>
                  <p>
                    During these few minutes of writing the names, it is best to
                    completely set aside all worldly thoughts and focus on
                    remembering the Supreme Being in the forms of Bhagavan
                    Ramachandra and Bhagavan Parama Shiva.
                  </p>
                  <h2>SUBMITTING THE FORM:</h2>
                  <p>
                    The completed form with the divine names written, should be
                    returned to the same person who supplied it, or dropped off
                    in the drop box at the branch Math.
                  </p>
                  <p>
                    The form with the divine names written can also be posted to
                  </p>
                  <p>
                    Harihara Namamrita Scheme, <br />
                    Dakshinamnaya Sri Sharada Peetham, <br />
                    Sringeri, <br />
                    Chikkamagaluru – 577139. <br />
                  </p>
                  <h2>EXTRA FORM:</h2>
                  <p>
                    Those who wish to write the names on more than one paper,
                    out of personal devotion, can do so by printing out the
                    extra form available in the link –
                    <a href="https://www.sringeri.net/hariharanamamrita/extraforms">
                      https://www.sringeri.net/hariharanamamrita/extraforms
                    </a>
                    . These papers will be considered as additional submissions.
                  </p>
                  <p>Yours sincerely </p>
                  <p>
                    Guru Seva Nirata PA Murali <br />
                    CEO & Administrator, <br />
                    Sringeri Math
                  </p>
                </div>

                {/* <SocialIcons/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
