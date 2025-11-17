import Image from "next/image";
import Link from "next/link";
import { navLinks, NavLink, SubLink } from '../components/NavLinks';
import BreadCrumbs from "../components/BreadCrumbs";
import { Metadata } from "next";
import LandingPageCards from "../components/LandingPageCards";

const subLinks: SubLink[] = [
  {title: 'Departments', url: '/contact/departments', image: "/assets/images/main-page-cards/Contact/CONTACT-DEPARTMENTS.jpg"},
  {title: 'Location', url: '/contact/location', image: "/assets/images/main-page-cards/Contact/CONTACT-LOCATION.jpg"},
  {title: 'Branches', url: '/branches', image: "/assets/images/main-page-cards/Contact/CONTACT-BRANCHES.jpg"},
];

interface Props {
  params: Promise<{ slug: string }>; 
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
      title: 'Contact Information',
      description: 'Postal correspondence The Administrator & CEO, Sringeri Math Sringeri, Chikmagalur District, Karnataka PIN – 577139. Phone Numbers +91-8265-252525 +91-8265-262626 +91-8265-272727 +91-8265-295555 +91-8265-295123 +91-8265-295594 Fax Number +91-8265-250792 Department Contacts Queries pertaining to seva etc. may be addressed to “ The Peshkar ” (seva@sringeri.net). Queries pertaining to Tax benefits etc. may be addressed to Administrative Office (adminoffice@sringeri.net). […]',
      openGraph: {
          title: 'Contact Information',
          description: 'Postal correspondence The Administrator & CEO, Sringeri Math Sringeri, Chikmagalur District, Karnataka PIN – 577139. Phone Numbers +91-8265-252525 +91-8265-262626 +91-8265-272727 +91-8265-295555 +91-8265-295123 +91-8265-295594 Fax Number +91-8265-250792 Department Contacts Queries pertaining to seva etc. may be addressed to “ The Peshkar ” (seva@sringeri.net). Queries pertaining to Tax benefits etc. may be addressed to Administrative Office (adminoffice@sringeri.net). […]',
          images: [],
          type: "website",
      }
  };
}

export default function Contact() {

  const breadcrumbsSeperator = '|';

  let breadcrumbs = [
      { title: "Home", link: "/" },
      { title: "Contact", link: "/contact" },
  ];

  return (
    <div className="bg-[var(--gray-200)]">
      {/* breadcrumbs */}
      <div className="text-xs px-5 py-2">
        <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator}/>
      </div>
      {/* Submenu Tab Content */}
      <LandingPageCards subLinks={subLinks} color={'var(--contact)'}/>
    </div>
  );
}