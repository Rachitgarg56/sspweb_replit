import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs';
import { API_URL } from '@/config/api';

interface DepartmentCardProps {
  name: string;
  phoneNumber: string;
  email: string;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ name, phoneNumber, email }) => {
  return (
    <div className="bg-white p-8 shadow-md">
      <h3 className="font-pt-serif text-[--contact] mb-6 text-[21px]">{name}</h3>
      <p className="my-2 text-xs uppercase text-[--contact] font-inter">
        <span className='text-[9px] font-semibold tracking-[0.18px]'>Phone:</span> <span className="text-[13px] font-medium tracking-[0.26px] lowercase text-[var(--brown-dark)]"><a href={`tel:${phoneNumber}`}>{phoneNumber}</a></span>
      </p>
      <hr />
      <p className="mt-2 text-xs uppercase text-[--contact] font-inter">
      <span className='text-[9px] tracking-[0.18px] font-semibold'>Email:</span> <span className="text-[13px] font-medium tracking-[0.26px] lowercase text-[var(--brown-dark)]"><a href={`mailto:${email}`}>{email}</a></span>
      </p>
    </div>
  );
};

let breadcrumbs = [
  { title: "Home", link: "/" },
  { title: "Contact", link: "/contact", desktopClick: false },
  { title: "Departments", link: "/contact/departments" },
];

const breadcrumbsSeperator = '|';

export async function generateMetadata() {
  return {
      title: "Departments",
      description: "Departments: Sri Sringeri Sharada Peetham",
      openGraph: {
          title: "Departments",
          description: "Departments: Sri Sringeri Sharada Peetham",
          images: [
              {
                  url: "/assets/images/main-page-cards/resources.jpg",
                  alt: "Departments",
              },
          ],
          type: "website",
      }
  };
}

export default async function Departments() {
  const parsedRes = await fetch(API_URL+'contact/departments');
  const departments = await parsedRes.json();
  return (
    <div className="min-h-screen bg-[--gray-100] py-8 text-[--brown-dark]">
      <div className="max-w-[1225px] mx-auto px-4">
        <div className="py-2 mb-6">
            <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator}/>
        </div>
        <h1 className="text-[37px] font-pt-serif text-[--contact] mb-8 text-center">Our Departments</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {departments.map((department) => (
            <DepartmentCard key={department.name} {...department} />
          ))}
        </div>
      </div>
    </div>
  );
}
