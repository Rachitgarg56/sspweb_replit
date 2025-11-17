'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ReactNode, useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { usePathname } from 'next/navigation'
import SearchBox from './SearchBox'

export interface SubLink {
  title: string
  url: string
  image?: string
  showOnDesktop?: boolean
  externalLink?: boolean
  icon?: ReactNode
  heroImage?: string
}

export interface NavLink {
  slug: string
  title: string
  url: string
  color: string
  hColor: string
  isActive: boolean
  subLinks?: SubLink[]
}

export const navLinks: NavLink[] = [
  {
    slug: 'events',
    title: 'Events',
    url: '/events',
    color: '#FFA500',
    hColor: '#F49600',
    isActive: false,
    subLinks: [
      { title: 'Upcoming Events', url: '/events/upcoming-events' },
      { title: 'Past Events', url: '/events/past-events' },
      { title: 'Calendar', url: '/events/calendar' },
    ],
  },
  {
    slug: 'pilgrim-info',
    title: 'Pilgrim Info',
    url: '/pilgrim-info',
    color: '#F47527',
    hColor: '#E26114',
    isActive: false,
    subLinks: [
      { title: 'Aksharabhyasa', url: '/sevas/aksharabhyasa' },
      { title: 'Temple Timings', url: '/pilgrim-info/temple-timings' },
      { title: 'Travel & Weather', url: '/pilgrim-info/travel-and-weather' },
      { title: 'Facilities', url: '/pilgrim-info/pilgrim-facilities' },
      { title: 'Temples', url: '/temples' },
      { title: 'Darshan Schedule', url: '/schedule', externalLink: true },
    ],
  },
  {
    slug: 'resources',
    title: 'Resources',
    url: '/resources',
    color: '#D04843',
    hColor: '#BA3933',
    isActive: false,
    subLinks: [
      { title: 'Stotras', url: '/stotras' },
      { title: 'Benedictory Discourses', url: '/anugraha-bhashanams' },
      {
        title: 'Bhajans',
        url: 'https://bhajan.sringeri.net/',
        externalLink: true,
      },
      { title: 'Panchangam', url: '/gallery/downloadables/panchangam' },
      { title: 'Downloads', url: '/gallery' },
    ],
  },
  {
    slug: 'online-services',
    title: 'Online services',
    url: '/online-services',
    color: '#98649D',
    hColor: '#834C88',
    isActive: false,
    subLinks: [
      {
        title: 'Online Seva',
        url: 'https://seva.sringeri.net/',
        externalLink: true,
      },
      {
        title: 'Accomodation',
        url: 'https://yatri.sringeri.net/rooms/reserve',
        externalLink: true,
      },
      {
        title: 'Donation',
        url: 'https://donate.sringeri.net/',
        externalLink: true,
      },
      {
        title: 'Donation (USD)',
        url: 'https://sringeriusa.org',
        externalLink: true,
      },
      {
        title: 'Online Bookstore',
        url: 'https://books.sringeri.net/',
        externalLink: true,
      },
    ],
  },
  {
    slug: 'about',
    title: 'About',
    url: '/about',
    color: '#4D809F',
    hColor: '#306584',
    isActive: false,
    subLinks: [
      { title: 'History', url: '/history' },
      { title: 'Guru Parampara', url: '/jagadgurus' },
      {
        title: 'Sri Adi Shankaracharya',
        url: '/history/sri-adi-shankaracharya',
      },
      { title: 'Sage Rishyashringa', url: '/history/sage-rishyashringa' },
      { title: 'The Amnaya Peethams', url: '/history/amnaya-peethams' },
      { title: 'Activities', url: '/activities' },
    ],
  },
  {
    slug: 'contact',
    title: 'Contact',
    url: '/contact',
    color: '#65A29A',
    hColor: '#468981',
    isActive: false,
    subLinks: [
      { title: 'Departments', url: '/contact/departments' },
      { title: 'Location', url: '/contact/location' },
      { title: 'Branches', url: '/branches' },
    ],
  },
]

export default function NavLinksPage() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [iconSize, setIconSize] = useState<'medium' | 'large'>('large')

  const toggleSubMenu = (slug: string) => {
    setOpenSubMenu(openSubMenu === slug ? null : slug)
  }

  const handleMenuClick = () => {
    setIsMenuOpen(false)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  const isNavLinkActive = (navLink: NavLink, pathname: string) => {
    if (pathname.startsWith(navLink.url)) return true
    if (navLink.subLinks?.some((sub) => pathname.startsWith(sub.url)))
      return true
    return false
  }

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 425) setIconSize('medium')
      else if (window.innerWidth < 1024) setIconSize('large')
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.tagName.toUpperCase() == 'INPUT') {
        return;
      }
      const searchContainer = document.getElementById('search-container')
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen])

  return (
   <div className="relative bg-[var(--gray-100)] px-4">
  <div className="flex justify-between gap-8 lg:px-8">
    <Link href="/">
      <div className="flex items-center space-x-4">
        <Image
          src="/assets/images/logo/sringeri-logo-text.png"
          alt="Sringeri Sharada Peetham"
          width={450}
          height={100}
          className="w-full max-w-[445px] h-auto my-2"
        />
      </div>
    </Link>

    {/* Desktop Navigation */}
    <div className="flex-1 flex items-center justify-end max-lg:hidden min-h-[20px]">
      {isSearchOpen ? (
        <div id="search-container" className="w-full max-w-2xl ml-auto">
          <SearchBox closeSearch={toggleSearch} />
        </div>
      ) : (
        <div className="flex space-x-6 max-lg:hidden self-stretch">
          {navLinks.map((link, idx) => {
            const isActive = isNavLinkActive(link, pathname)

            return (
              <div
                key={link.slug}
                className="relative group flex items-center"
              >
                <div
                  className={
                    'uppercase whitespace-nowrap font-inter text-[13px] border-b-2 border-solid border-transparent cursor-pointer ' +
                    (isActive
                      ? `text-[var(--brown-dark)]`
                      : 'text-[var(--brown-medium)]')
                  }
                  style={
                    isActive
                      ? {
                          borderColor: link.color,
                          color: 'var(--brown-dark)',
                          fontWeight: 500,
                        }
                      : { fontWeight: 500 }
                  }
                  onMouseEnter={(e) => {
                    // e.currentTarget.style.fontWeight = '550'
                    e.currentTarget.style.borderColor = link.hColor
                    e.currentTarget.style.color = 'var(--brown-dark)'
                  }}
                  onMouseLeave={(e) => {
                    if (isActive) return
                    // e.currentTarget.style.fontWeight = '550'
                    e.currentTarget.style.borderColor = isActive
                      ? link.color
                      : 'transparent'
                    e.currentTarget.style.color = 'var(--brown-medium)'
                  }}
                >
                  {' '}
                  {link.title}
                </div>
                 {link.subLinks && (
                            <div className={`${(idx == navLinks.length - 1 || idx == navLinks.length - 2) ? '-right-8' : ' left-0'} absolute hidden z-20 py-2 top-full   group-hover:block text-white shadow-lg`} style={{ backgroundColor: link.color }}>
                                {link.subLinks.map((subLink) => (
                                    <Link target={`${subLink.externalLink ? '_blank' : ""}`} href={subLink.url} key={subLink.url} className="block px-4 py-2 whitespace-nowrap uppercase text-[13px] font-inter font-semibold" 
                                        onMouseEnter={(e) => {
                                            (e.target as HTMLElement).style.backgroundColor = link.hColor;
                                          }}
                                          onMouseLeave={(e) => {
                                            (e.target as HTMLElement).style.backgroundColor = link.color;
                                          }}
                                    >
                                        {subLink.title}
                                    </Link>
                                ))}
                            </div>
                        )}
              </div>
            )
          })}

          <button
            onClick={toggleSearch}
            className="flex items-center justify-center p-2 text-[#7E6F5C] transition-colors text-base	"
            aria-label="Search"
          >
            <SearchIcon
              fontSize={iconSize === 'large' ? 'medium' : 'small'}
            />
          </button>
        </div>
      )}
    </div>

    {/* Mobile Navigation */}
    <div className="lg:hidden flex items-center space-x-4">
      {/* <button
        onClick={toggleSearch}
        className="flex items-center justify-center p-2 text-[var(--pilgrim-hover)]"
        aria-label="Search"
      >
        <SearchIcon fontSize={iconSize} />
      </button> */}

      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {!isMenuOpen ? (
          <MenuIcon
            fontSize={iconSize}
            className="text-[var(--pilgrim-hover)]"
          />
        ) : (
          <CloseIcon
            fontSize={iconSize}
            className="text-[var(--pilgrim-hover)]"
          />
        )}
      </button>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="absolute left-0 z-50 bg-[var(--pilgrim)] text-white top-full w-full">
        <div className="flex flex-col pt-6 space-y-4">
          <Link
            href="/"
            onClick={handleMenuClick}
            className={`uppercase font-medium font-inter text-sm px-6 ${
              pathname === '/' ? 'text-[#FCCEB2]' : ''
            }`}
          >
            Home
          </Link>
          {navLinks.map((link) => {
            const isActive = isNavLinkActive(link, pathname)
            return (
              <li key={link.slug} className="py-2 list-none">
                <div className="flex justify-between items-center">
                  <Link
                    href={link.url}
                    onClick={handleMenuClick}
                    className={`uppercase font-inter font-medium text-sm px-6 ${
                      isActive ? 'text-[#FCCEB2]' : ''
                    }`}
                  >
                    {link.title}
                  </Link>
                  {link.subLinks && (
                    <button
                      onClick={() => toggleSubMenu(link.slug)}
                      className="text-lg pr-6"
                    >
                      {openSubMenu === link.slug ? '-' : '+'}
                    </button>
                  )}
                </div>
                {link.subLinks && openSubMenu === link.slug && (
                  <ul className="pl-12 py-2 flex flex-col gap-2 bg-[var(--pilgrim-hover)]">
                    {link.subLinks.map((subLink) => (
                      <li key={subLink.url} className="py-1">
                        <Link
                          href={subLink.url}
                          onClick={handleMenuClick}
                          className="text-sm font-inter font-medium uppercase"
                          target={
                            subLink.externalLink ? '_blank' : undefined
                          }
                        >
                          {subLink.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
          
          {/* Search Input - */}
          <div className="px-6 pb-6 pt-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Search Terms"
                className="w-full px-4 py-3 bg-white text-[#F47527] rounded-sm text-sm placeholder-[#F47527] pr-12 focus:outline-none" onClick={toggleSearch}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F47527]">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>

  {/* Mobile Search Overlay - Removed duplicate close button */}
  {isSearchOpen && (
    <div className="fixed inset-0 z-[9999] bg-white bg-opacity-95 lg:hidden">
      <div className="container mx-auto px-4 py-4">
        <div className="w-full max-w-10xl mx-auto mt-8">
          <SearchBox closeSearch={toggleSearch} />
        </div>
      </div>
    </div>
  )}
</div>
  )
}
