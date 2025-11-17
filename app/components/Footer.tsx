'use client'
import Link from "next/link";
import { navLinks } from "./NavLinks";
import Image from "next/image";
import footerImage from "../../public/assets/images/footer-collage-web.jpg"
import { url } from "inspector";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import EventIcon from '@mui/icons-material/Event';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { v4 as uuidv4 } from 'uuid';
import { LOCATION_ICON } from '../../public/assets/svgs/svg.js'

const Branches = [
  { title: 'Andhra Pradesh', link: '/branches/andhra-pradesh' },
  { title: 'Karnataka', link: '/branches/karnataka' },
  { title: 'Kerala', link: '/branches/kerala' },
  { title: 'Maharashtra', link: '/branches/maharashtra' },
  { title: 'New Delhi', link: '/branches/new-delhi' },
  { title: 'Tamil Nadu', link: '/branches/tamil-nadu' },
  { title: 'Telangana', link: '/branches/telengana' },
  { title: 'Uttar Pradesh', link: '/branches/uttar-pradesh' },
  { title: 'Uttarakhand', link: '/branches/uttarakhand' }
];

const Institutions = [
  { title: 'Tattvaloka', link: '/activities/affiliated-institutions/inland-affiliations/tattvaloka' },
  { title: 'Vidyatheertha Foundation', link: '/activities/affiliated-institutions/inland-affiliations/vidyatheertha-foundation' },
  { title: 'SVBF (USA)', link: '/activities/affiliated-institutions/overseas-affiliations/svbf-usa' },
  { title: 'SVBF (Canada)', link: '/activities/affiliated-institutions/overseas-affiliations/svbf-canada' }
];

const ExternalLinks = [
  { title: 'Surasaraswathi Sabha', link: 'https://www.surasaraswathisabha.org/' },
  { title: 'Advaita Sharada', link: 'https://advaita-sharada.sringeri.net/' },
  { title: 'Vijaya Yatra', link: 'https://vijayayatra.sringeri.net/' },
  { title: 'Online Book Store', link: 'https://books.sringeri.net/' }
];

export default function Footer() {
  return (
    <div className="">
      <div>
        {/* first line with 6 colors */}
        <div className="flex">
          {navLinks.map((nl) => (
            <div
              key={nl.slug}
              style={{ borderColor: nl.color }}
              className="border-b-4 w-1/6"
            />
          ))}
        </div>

        <div><Image src={footerImage} alt="" className="md:h-80 h-[160px] object-cover" /></div>
        {/* reverse 6 color line */}
        <div className="flex">
          {navLinks.slice().reverse().map((nl) => (
            <div
              key={nl.slug}
              style={{ borderColor: nl.color }}
              className="border-b-4 w-1/6"
            />
          ))}
        </div>
      </div>
      <div className="bg-center bg-cover bg-no-repeat" style={{ 
          backgroundImage: "url('/assets/images/sringeri-tan-background-texture-4.jpg')",
          imageRendering: "auto",
      }}>
        <div className="md:px-44">
          {/* <div className="py-8 px-8 md:px-0">
            <h1 className="font-pt-serif text-[var(--pilgrim-hover)] pb-2 md:text-xl">Join Our Newsletter</h1>
            <input type="email" name="email" id="email" placeholder="Enter Your Email Address" className="border border-[var(--pilgrim)] rounded-sm w-3/5 mr-4 p-1 placeholder:text-xs" />
            <button className="text-white bg-[var(--pilgrim-hover)] px-6 py-2 rounded-sm uppercase text-xs">Submit</button>
            <p className="text-xs text-[var(--brown-medium)] pt-2">Read our Privacy policy.</p>
          </div> */}
          {/* <hr className="block md:hidden" /> */}
        
          <div className="flex items-center justify-center gap-8 p-12 md:text-center max-md:flex-col max-md:gap-4 max-md:p-4">
            <h1 className="font-pt-serif text-[var(--pilgrim-hover)] text-[15px] md:text-[21px]">Connect with us</h1>
            <div className="flex space-x-7 max-sm:space-x-5">
              <Link target="_blank" href="https://www.youtube.com/sharadapeetham"> <YouTubeIcon className="text-[var(--pilgrim-hover)]" /> </Link>
              <Link target="_blank" href="https://www.whatsapp.com/channel/0029VagEL8x6hENn0zfWSn2e"> <WhatsAppIcon className="text-[var(--pilgrim-hover)]" /> </Link>
              <Link target="_blank" href="https://telegram.me/sringerimath"> <TelegramIcon className="text-[var(--pilgrim-hover)]" /> </Link>
              <Link target="_blank" href="https://x.com/sringerimath?mx=2"> <XIcon className="text-[var(--pilgrim-hover)]" /> </Link>
              <Link target="_blank" href="https://www.facebook.com/sringerimath/"> <FacebookRoundedIcon className="text-[var(--pilgrim-hover)]" /> </Link>
              <Link target="_blank" href="https://www.instagram.com/sharadapeetham/"> <InstagramIcon className="text-[var(--pilgrim-hover)]" /> </Link>
              <Link target="_blank" href="https://files.sringeri.net/assets/images/announcements/2025_special-events.ics"> <EventIcon className="text-[var(--pilgrim-hover)]" /> </Link>
            </div>
          </div>

        </div>
        <hr className="border-b-0 border-solid border-[#E2D0BB]" />
        <div className="max-md:px-4 p-8 md:py-12 md:px-44 text-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-[var(--brown-dark)]">
            <div>
              <h3 className="text-[var(--pilgrim-hover)] text-[13px] md:text-lg mb-3 font-pt-serif">Branches</h3>
              <ul>
                {Branches.map((branch, index) => (
                  <Link href={branch.link} key={uuidv4()}><li className="mb-3 text-[#443D32] font-inter text-[10px] md:text-[13px]">{branch.title}</li></Link> //have to make these links to go to the branch google search result
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[var(--pilgrim-hover)] text-[13px] md:text-lg mb-3 font-pt-serif">Affiliate Institutions</h3>
              <ul className="mb-8 md:mb-14">
                {Institutions.map((institution, index) => (
                  <Link href={institution.link} key={uuidv4()}><li key={index} className="mb-3 font-inter text-[10px] md:text-[13px]">{institution.title}</li></Link> //have to make these links to go to the branch google search result
                ))}
              </ul>

              <div className="">
                <Link href={'/activities'}><h3 className="text-[var(--pilgrim-hover)] text-[13px] md:text-lg mb-3 font-pt-serif">Activities</h3></Link>
                <Link href={'/activities/education'}><p className="mb-3 font-inter text-[10px] md:text-[13px]">Educational Activities</p></Link>
                <Link href={'/activities/social-activities'}><p className="mb-2 font-inter text-[10px] md:text-[13px]">Social Activities</p></Link>
              </div>

            </div>
            <div>
              <h3 className="text-[var(--pilgrim-hover)] text-[13px] md:text-lg mb-3 font-pt-serif">External Links</h3>
              <ul>
                {ExternalLinks.map((link, index) => (
                  <a target="_blank" href={link.link} key={uuidv4()}><li key={index} className="mb-3 font-inter text-[10px] md:text-[13px]">{link.title}</li></a>
                ))}
              </ul>
            </div>
            <div className="row-start-1 col-start-2 md:col-start-4">
              <h3 className="text-[var(--pilgrim-hover)] text-[13px] md:text-lg mb-3 font-pt-serif">Contact</h3>
              <address className="not-italic mb-6 font-inter text-[10px] md:text-[13px] flex flex-col gap-1">
                <p>The Administrator, </p>
                <p>Sringeri Math and its Properties, </p>
                <p>Sringeri, Chikkamagaluru District, </p>
                <p>Karnataka - 577139 </p>
              </address>
              <Link target="_blank" href="https://maps.app.goo.gl/A9wwpbFQLwGaH7vH8">
                
                <p className="mb-5 font-inter text-[10px] md:text-[13px] flex items-center gap-[2px]">
                {LOCATION_ICON}
                  Location
                </p>
              </Link>
              <p className="mb-2 font-inter text-[10px] md:text-[13px]"><a href="tel:+918265252525">+91-08265-252525</a></p>
              <p className="mb-2 font-inter text-[10px] md:text-[13px]"><a href="tel:+918265262626">+91-8265-262626</a></p>
              <p className="mb-2 font-inter text-[10px] md:text-[13px]"><a href="tel:+918265272727">+91-8265-272727</a></p>
              <p className="font-inter mt-5 text-[10px] md:text-[13px]"><a href="mailto:adminoffice@sringeri.net">adminoffice@sringeri.net</a></p>
            </div>
          </div>
        </div>
        <hr className="border-b-0 border-solid border-[#E2D0BB]" />
        <p className="text-[var(--brown-medium)] font-inter max-sm:text-[9px] text-[10px] text-center py-2"> &copy; {new Date().getFullYear()}. All rights reserved by Dakshinamnaya Sri Sharada Peetham, Sringeri</p>
      </div>
      
    </div>
  );
}