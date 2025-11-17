'use client'

import React, { ReactNode, useEffect, useState, use } from 'react';
import { API_URL } from '../../config/api';

interface Temple {
  title?: string;
  content?: ReactNode;
}
  
export default function Page(
  props: {
    params: Promise<{ slug?: string[] }>;
  }
) {
  const params = use(props.params);
  const { slug } = params;
  const [templeData, setTempleData] = useState<Temple | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    async function getTemple() {
      try {
        const res = await fetch(`${API_URL}pilgrim-info/temples/${params.slug}`);
        if (!res.ok) {
          throw new Error('Temple not found');
        }
        const parsedRes = await res.json();
        setTempleData(parsedRes);
      } catch (error) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    getTemple();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20 text-lg font-semibold">Loading...</div>;
  }

  if (notFound) {
    return <div className="text-center py-20 text-lg font-semibold text-red-500">Not found.</div>;
  }


  return (
    <div className=" py-8 font-inter">
        <div className="text-xs ml-40 py-2 mb-6">
          Home / Pilgrim Info / Temple Timings
      </div>
      {slug ? 
        <div>Slug: {slug?.join(" / ")}</div> :
        <></>
      }
      <div className="max-w-6xl mx-auto">
        <div className="md:flex md:space-x-6">
        <aside className="bg-white h-32 w-64 px-12 py-6 md:p-6 shadow-md mb-8 md:mb-0">
          <h2 className="text-lg font-pt-serif text-[--brown-dark] mb-4">Language</h2>
          <select className="w-full p-2 text-white uppercase text-xs rounded-sm shadow-sm bg-[--pilgrim] focus:ring-[--pilgrim-hover] focus:border-[--pilgrim-hover]">
            <option>English</option>
            <option>Kannada</option>
            <option>Sanskrit</option>
          </select>
        </aside>
          <div className="flex-1 md:ml-8 bg-white shadow-md p-6 md:px-12">
          <h1 className="text-4xl font-pt-serif text-[--pilgrim] mb-8 text-center">{(slug?.length == 0) ? 'Temples' : templeData.title}</h1>
          <hr className='my-6' />
            {/* {menus.map((menu, index) => (
              <div key={index} className="">
                <h3 className="text-xl font-pt-serif text-[--pilgrim] mb-4">{timing.title}</h3>
                <p className="text-[--brown-dark] mb-2 text-xs">
                  <span className="font-semibold">Normal Days</span> | {timing.normalDays}
                </p>
                {menu.specialDays && (
                  <p className="text-[--brown-dark] text-xs">
                    <span className="font-semibold"></span> {timing.specialDays}
                  </p>
                )}
                <hr className='my-6' />
              </div>  
            ))} */}
            <p className="text-sm text-[--brown-medium] mt-4 italic ">
              * Based on the events and Jagadguru's camps, the timings are subject to change.
            </p>

            <p dangerouslySetInnerHTML={{ __html: templeData?.content }} ></p>

          </div>
        </div>
      </div>
    </div>
  );
}
