'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SubLink } from './NavLinks';

interface Props {
    subLinks: SubLink[];
    color?: string;
    colorHover?: string;
    iconColor?: string;
}

const SubNavDropdown = ({ subLinks, color, colorHover, iconColor }: Props) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const activeLink = subLinks.find(sl => pathname.endsWith(sl.url)) || subLinks[0];
    
    return (
        <div className="md:hidden block relative">
            {/* Dropdown button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[var(--events)] max-sm:h-[34px] flex justify-between items-center p-5 uppercase text-white text-sm w-full"
                style={{ backgroundColor: colorHover }}
            >
                <span className='font-inter font-medium text-[10px] sm:text-[14px]'>{activeLink.icon} {activeLink.title}</span>
                <span className={`transition-transform duration-300`}>{!isOpen ? <ExpandMoreIcon/> : <ExpandLessIcon/>}</span>
            </button>

            {/* Dropdown menu with smooth height transition */}
            <div 
                className={`absolute top-full left-0 w-full shadow-lg z-10 transition-all duration-300 ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 hidden'}`}
            >
                {subLinks
                    .filter(sl => sl.url !== activeLink.url)
                    .map(sl => (
                        <Link 
                            target={`${sl.externalLink ? '_blank' : ""}`}
                            href={sl.url} 
                            key={sl.url} 
                            className={`max-sm:h-[34px] flex space-x-3 uppercase items-center p-5 text-white text-sm w-full hover:bg-[${colorHover}]`}
                            onClick={() => setIsOpen(false)}
                            style={{ backgroundColor: color }}
                        >
                            {
                                sl?.icon &&
                                <div className="-mt-[2px]" style={{ color:'white'}}>
                                    {sl.icon}
                                 </div>
                            }
                            <p className='text-[10px] sm:text-[14px] font-semibold'>
                                {sl.title}
                            </p>
                        </Link>
                    ))}
            </div>
        </div>
    );
}

export default SubNavDropdown;
