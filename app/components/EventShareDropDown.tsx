'use client'

import React, { useEffect, useRef, useState } from 'react'
import { COPY_LINK_ICON, WHATSAPP_ICON, FACEBOOK_ICON, SHARE_ICON } from '@/public/assets/svgs/svg';
import XIcon from '@mui/icons-material/X';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

interface Props {
    title: string;
    url: string;
}

const EventShareDropDown = ({ title, url }: Props) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const dropdownRef = useRef(null);
    
    function handleShareButtonClick() {
        setShowDropDown(prev => !prev);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
    };

    const shareOnFacebook = () => {
        if (!url) {
            console.error("URL is undefined or empty.");
            return;
        }
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        
        const width = 550;
        const height = 400;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        window.open(
            facebookUrl,
            "facebook-share-dialog",
            `width=${width},height=${height},top=${top},left=${left},toolbar=0,location=0,menubar=0,directories=0,scrollbars=0`
        );
    };

    const shareOnWhatsApp = () => {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
        window.open(whatsappUrl, "_blank");
    };

    const shareOnTwitter = () => {
      if (!url) {
          console.error("URL is undefined or empty.");
          return;
      }
      const tweetText = "Check this out!";
      const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(tweetText)}`;

      const width = 550;
      const height = 400;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      window.open(
          twitterUrl,
          "twitter-share-dialog",
          `width=${width},height=${height},top=${top},left=${left},toolbar=0,location=0,menubar=0,directories=0,scrollbars=0`
      );
    };

    const shareViaGmail = () => {
        if (!url) {
            console.error("URL is undefined or empty.");
            return;
        }
        const subject = "Have a look at this!";
        const body = `I thought you might find this interesting: ${url}`;
        
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&tf=1`;

        window.open(gmailUrl, "_blank");
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropDown(false);
            }
        }

        if (showDropDown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropDown]);

    return (
        <div ref={dropdownRef} className={`${!showDropDown ? 'right-[31px]' : '-right-[88px] sm:-right-12'} absolute z-50 top-4 flex flex-col items-center`}>
            <button onClick={handleShareButtonClick} className='font-medium gap-1 share-event flex items-center text-[#B4A597] hover:text-[#FF9900]'>
                <span className='uppercase font-inter text-[10.5px] text-[brown-light] leading-none'>share</span>
                <span className='text-[11px]'>{SHARE_ICON}</span>
            </button>

                {
                    showDropDown &&
                    <>
                        <div className='hidden relative share-event-dropdown sm:flex flex-col'>        
                            <div className="w-0 h-0 mx-auto border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white shadow-lg"></div>
                            
                            <ul className='rounded-sm shadow-lg bg-white text-[#6b6b6b]'>
                                <li onClick={handleCopy} className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:text-[#191919]'>
                                    <div className='w-6 ml-[2px]'>{COPY_LINK_ICON}</div>
                                    <span className='text-[14px] font-inter'>Copy Link</span>
                                </li>
                                <hr className='border-b-0' />
                                <li onClick={shareOnWhatsApp} className='flex items-center w-52 gap-2 px-4 py-2 cursor-pointer hover:text-[#191919]'>
                                    <div className='w-6'>{WHATSAPP_ICON}</div>
                                    <span className='text-[14px] -ml-[2px] font-inter'>Share on Whatsapp</span>
                                </li>
                                <hr />
                                <li onClick={shareOnFacebook} className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:text-[#191919]'>
                                    <div className='w-6 ml-[2px]'>{FACEBOOK_ICON}</div>
                                    <span className='text-[14px] font-inter'>Share on Facebook</span>
                                </li>
                                <hr />
                                <li onClick={shareOnTwitter} className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:text-[#191919]'>
                                    <div className='w-6 ml-[2px]'><XIcon fontSize='small' /></div>
                                    <span className='text-[14px] font-inter'>Share on Twitter</span>
                                </li>
                                <hr />
                                <li onClick={shareViaGmail} className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:text-[#191919]'>
                                    <div className='w-6 ml-[2px]'><MailOutlineIcon fontSize='medium' /></div>
                                    <span className='text-[14px] font-inter'>Share on Mail</span>
                                </li>
                            </ul>
                        </div>
                        <div className='sm:hidden w-[208px] mr-20 share-event-dropdown flex items-center justify-between rounded-sm shadow-lg bg-white text-[#6b6b6b] px-3 py-2'>
                            <div title='Copy Link' onClick={handleCopy} className='w-6 ml-[2px] cursor-pointer hover:text-[#191919]'>{COPY_LINK_ICON}</div>
                            <div title='Whatsapp' onClick={shareOnWhatsApp} className='w-6 cursor-pointer hover:text-[#191919]'>{WHATSAPP_ICON}</div>
                            <div title='Facebook' onClick={shareOnFacebook} className='w-6 ml-[2px] cursor-pointer hover:text-[#191919]'>{FACEBOOK_ICON}</div>
                            <div title='Twitter' onClick={shareOnTwitter} className='w-6 ml-[2px] cursor-pointer hover:text-[#191919]'><XIcon fontSize='small' /></div>
                            <div title='Mail' onClick={shareViaGmail} className='w-6 ml-[2px] cursor-pointer hover:text-[#191919]'><MailOutlineIcon fontSize='medium' /></div>
                        </div>
                    </>
                }
        </div>
    )
}

export default EventShareDropDown
