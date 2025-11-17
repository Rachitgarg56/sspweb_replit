"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type SidebarItem = {
  title: string;
  link?: string;
  children?: SidebarItem[];
  showChildren?: boolean;
};

interface DropdownSidebarProps {
  data: SidebarItem[];
  heading?: string;
  highlight: string;
}

interface ListContainerProps {
  data: SidebarItem[];
  highlight?: string;
  bgColor?: string;
  type?: string;
}

const NestedSidebarItem = ({
  item,
  level = 0,
  highlight,
  type,
}: {
  item: SidebarItem;
  level?: number;
  highlight?: string;
  type?: string;
}) => {
  const [isOpen, setIsOpen] = useState(item.showChildren || false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith(item.link)) {
      setIsOpen(true);
    }
  },[])

  const toggleChildren = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <li className={`${type === 'mobile' ? 'text-white' : 'text-[#7e6f5c]'} w-full flex flex-col text-[14px] font-pt-serif`}>
      <div className="flex items-center">
        {item.link ? (
          <Link className={`w-full font-pt-serif p-2 pl-${level * 4}`} href={item.link} style={type === 'mobile' ? { color: 'white' } : { color: pathname === item.link ? highlight : "#7e6f5c" }}>
            {item.title}
          </Link>
        ) : (
          <span className={`w-full font-pt-serif p-2 pl-${level * 4}`}>{item.title}</span>
        )}
        {item.children?.length > 0 && (
          <span className="cursor-pointer text-[14px] font-pt-serif" onClick={toggleChildren}>
            {/* {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} */}
            {isOpen ? '-' : '+'}
          </span>
        )}
      </div>
      {item.children && isOpen && (
        <ul className={`flex flex-col pl-4`}>
          {item.children.map((child, index) => (
            <NestedSidebarItem key={index} item={child} level={level + 1} highlight={highlight} type={type} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const ListContainer = ({ data, highlight, bgColor, type }: ListContainerProps) => {
  return (
    <ul className={`flex flex-col bg-[${bgColor}] ${type === 'mobile' ? 'pr-4' : ''}`}>
      {data.map((item, index) => (
        <NestedSidebarItem key={index} item={item} highlight={highlight} type={type} />
      ))}
    </ul>
  )
}

const DropdownSidebar = ({ data, heading, highlight }: DropdownSidebarProps) => {
  return (
    <aside className="lg:flex flex-col gap-6 min-w-72 lg:max-w-72 hidden">
      <div className="bg-[#FFFFFF] p-6 flex flex-col gap-6 sticky top-0 max-[462px]:p-4 max-lg:max-h-96 max-lg:overflow-y-scroll">
        <h2 className="text-[var(--brown-medium)] text-[17px] font-pt-serif flex items-center gap-1">
          {heading}
        </h2>
        <hr />
        <ListContainer data={data} highlight={highlight} />
      </div>
    </aside>
  );
};

export default DropdownSidebar;
