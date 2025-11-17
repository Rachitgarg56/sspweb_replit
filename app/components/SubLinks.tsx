"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SubLink } from "./NavLinks";
import React, { ReactNode, useEffect, useState } from "react";

export default function SubLinks({ 
  subLinks, 
  color,
  iconColor,
}: { 
  subLinks: SubLink[];
  color?: string;
  iconColor?: string;
}) {
  const pathname = usePathname(); 

  const [activeTabIdx, setActiveTabIdx] = useState(-1);

  function filterSubLinks() {
    subLinks = subLinks.filter((sl) => !Object.hasOwn(sl, 'showOnDesktop') || Object.hasOwn(sl, 'showOnDesktop') && sl.showOnDesktop !== false)
  }
  
  filterSubLinks();

  useEffect(() => {
    function findActiveTab() {
      let maxChar = 0;
      subLinks.forEach((sl,idx) => {
        if (pathname.startsWith(sl.url)) {
          setActiveTabIdx(sl.url.length > maxChar ? idx : activeTabIdx);
          maxChar = sl.url.length > maxChar ? sl.url.length : maxChar;
        }
      }) 
    }
    findActiveTab();
  },[pathname])

  return (
    <>
      {subLinks
        .map((sl,idx) => {
          const isActive = activeTabIdx === idx || pathname.endsWith(sl.url);
          return (
            <Link
              target={`${sl.externalLink ? '_blank' : ""}`}
              key={sl.url}
              href={sl.url}
              className="py-4 max-lg:px-4 px-6 whitespace-nowrap flex items-center gap-2"
              style={{ backgroundColor: isActive ? color : "transparent" }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = color;
                } 
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              {
                sl?.icon &&
                <div className="-mt-[2px]" style={{ color: isActive ? 'white' : iconColor }}>
                  {sl.icon}
                </div>
              }
              <p className="font-inter font-medium text-[13px]">{sl.title}</p>
            </Link>
          );
        })}
    </>
  );
}
