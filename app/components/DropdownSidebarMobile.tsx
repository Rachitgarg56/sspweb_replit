'use client'

import React, { useState } from 'react'
import { SidebarItem } from '../src/types'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListContainer } from './DropdownSidebar';
import { usePathname } from 'next/navigation';

interface DropdownSidebarMobileProps {
    data: SidebarItem[];
    bgColor: string;
    bgHover: string;
    title?: string;
}

export const DropdownSidebarMobile = ({ data, title, bgColor, bgHover }: DropdownSidebarMobileProps) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    
    return (
        <div className='lg:hidden block'>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-[${bgHover}] py-[2px] sm:py-2 flex justify-between ${!isOpen ? 'rounded-[3px]' : ''} pl-2 pr-1 items-center text-white text-sm w-full`}
                style={{background: bgHover}}
            >
                
                <span className='font-inter font-medium text-[10px] sm:text-[14px]'>{title ? title : 'Introduction'}</span>
                
                <span className={`transition-transform duration-300`}>{!isOpen ? <ExpandMoreIcon sx={{fontSize:'20px'}}/> : <ExpandLessIcon sx={{fontSize:'20px'}}/>}</span>
            </button>

            {
                isOpen && 
                <ListContainer data={data} bgColor={bgColor} type='mobile' />
            }
        </div>
    )
}
