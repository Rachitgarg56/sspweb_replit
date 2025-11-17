'use client'

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import {
  faCalendar,
  faComment,
  faFile,
} from '@fortawesome/free-regular-svg-icons'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'

import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type CollectionType =
  | 'events'
  | 'announcements'
  | 'benedictoryCourses'
  | 'temporaryPages'
interface LanguageType {
  full: string
  short: string
}

type SearchBoxProps = {
  closeSearch?: () => void
}

interface SearchResult {
  id: string
  title: string
  description: string
  collection: CollectionType
  slug?: string
  link?: string
  language?: LanguageType[]
  date?: string
}

interface SearchResponse {
  results: SearchResult[]
  counts: {
    events: number
    announcements: number
    benedictoryCourses: number
    temporaryPages: number
  }
}

const COLLECTION_CONFIG: Record<
  CollectionType,
  {
    name: string
    color: string
    textColor: string
    bgColor: string
    hoverBgColor: string
    activeBgColor: string
    icon: IconDefinition
    getPath: (item: SearchResult) => string
  }
> = {
  events: {
    name: 'Events',
    color: 'bg-orange-500',
    textColor: 'text-orange-500',
    bgColor: 'bg-orange-100',
    hoverBgColor: 'hover:bg-orange-200',
    activeBgColor: 'bg-orange-200',
    icon: faCalendar,
    getPath: (item) => `/events/${item.slug}`,
  },
  announcements: {
    name: 'Announcements',
    color: 'bg-amber-400',
    textColor: 'text-amber-500',
    bgColor: 'bg-amber-100',
    hoverBgColor: 'hover:bg-amber-200',
    activeBgColor: 'bg-amber-200',
    icon: faBullhorn,
    getPath: (item) => `/announcement/${item.slug}`,
  },
  benedictoryCourses: {
    name: 'Discourses',
    color: 'bg-red-700',
    textColor: 'text-red-700',
    bgColor: 'bg-red-100',
    hoverBgColor: 'hover:bg-red-200',
    activeBgColor: 'bg-red-200',
    icon: faComment,
    getPath: (item) =>
      `/anugraha-bhashanams/${item.language?.[0].full}/${item.slug}`,
  },
  temporaryPages: {
    name: 'Pages',
    color: 'bg-teal-600',
    textColor: 'text-teal-600',
    bgColor: 'bg-teal-100',
    hoverBgColor: 'hover:bg-teal-200',
    activeBgColor: 'bg-teal-200',
    icon: faFile,
    getPath: (item) => `/${item.link}` || '#',
  },
}

const SearchBox = forwardRef<
  { handleResultClick: (result: SearchResult) => void },
  SearchBoxProps
>(({ closeSearch }, ref) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [activeFilter, setActiveFilter] = useState<CollectionType | 'all'>(
    'all'
  )
  const [counts, setCounts] = useState({
    events: 0,
    announcements: 0,
    benedictoryCourses: 0,
    temporaryPages: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1)
  const [isNavigating, setIsNavigating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hasSearched, setHasSearched] = useState(false) // Add this state
  const searchInputRef = useRef<HTMLInputElement>(null)
  const resultsContainerRef = useRef<HTMLUListElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchBoxRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])


  const cleanDescription = (html: string) => {
    if (!html) return ''
    const plainText = html.replace(/<[^>]*>?/gm, '')
    return plainText.length > 120
      ? `${plainText.substring(0, 160)}...`
      : plainText
  }

  const searchAllCollections = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([])
      setFilteredResults([])
      setCounts({
        events: 0,
        announcements: 0,
        benedictoryCourses: 0,
        temporaryPages: 0,
      })
      setHasSearched(false) 
      return
    }

    setIsLoading(true)
    setHasSearched(false) 

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      if (!response.ok) throw new Error('Search failed')

      const data: SearchResponse = await response.json()

      const validatedResults = data.results
        .filter((item: any) => item && item.collection)
        .map((item: any) => ({
          id: item.id || '',
          title: item.title || '',
          description: item.description || item.content || '',
          collection: item.collection,
          slug: item.slug || '',
          link: item.link || '',
          language: item.language || 'en',
          date: item.date || item.createdAt || '',
        }))
        .filter(
          (item: any) =>
            (item.collection !== 'temporaryPages' && item.slug) ||
            (item.collection === 'temporaryPages' && item.link)
        )

      setResults(validatedResults)
      setFilteredResults(validatedResults)
      setCounts(
        data.counts || {
          events: 0,
          announcements: 0,
          benedictoryCourses: 0,
          temporaryPages: 0,
        }
      )
      setActiveFilter('all')
      setSelectedResultIndex(-1)
      setHasSearched(true) 
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
      setFilteredResults([])
      setCounts({
        events: 0,
        announcements: 0,
        benedictoryCourses: 0,
        temporaryPages: 0,
      })
      setHasSearched(true) 
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      searchAllCollections(query)
    }, 200) 

    return () => {
      clearTimeout(handler)
    }
  }, [query, searchAllCollections])

  const handleResultClick = useCallback(
    (result: SearchResult) => {
      if (!result || !result.collection || isNavigating) return

      setIsNavigating(true)

      const config = COLLECTION_CONFIG[result.collection as CollectionType]
      if (!config) {
        setIsNavigating(false)
        return
      }

      const path = config.getPath(result)

      // Close search immediately
      if (closeSearch) {
        closeSearch()
      }

      if (result.collection === 'temporaryPages' && result.link) {
        router.push(path) 
        setIsNavigating(false)
      } else if (path && path !== '#') {
        if (typeof window !== 'undefined') {
          window.location.href = path
        } else {
          router.push(path)
          setIsNavigating(false)
        }
      } else {
        setIsNavigating(false)
      }
    },
    [closeSearch, router, isNavigating]
  )

  useImperativeHandle(ref, () => ({
    handleResultClick,
  }))

  const handleFilterClick = useCallback(
    (
      collection: CollectionType | 'all',
      event?: React.MouseEvent | React.TouchEvent
    ) => {
      if (event?.cancelable) {
        event.preventDefault()
        event.stopPropagation()
      }

      setActiveFilter(collection)
      if (collection === 'all') {
        setFilteredResults(results)
      } else {
        setFilteredResults(
          results.filter((result) => result.collection === collection)
        )
      }
      setSelectedResultIndex(-1)

      // Keep focus and search open
      if (searchInputRef.current) {
        setTimeout(() => {
          searchInputRef.current?.focus()
        }, 100)
      }
    },
    [results]
  )

  const handleClearSearch = () => {
    setQuery('')
    setResults([])
    setFilteredResults([])
    setCounts({
      events: 0,
      announcements: 0,
      benedictoryCourses: 0,
      temporaryPages: 0,
    })
    setHasSearched(false) 

    if (closeSearch) {
      closeSearch()
    } else {
      if (searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredResults.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedResultIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : prev
      )
      scrollIntoViewIfNeeded()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedResultIndex((prev) => (prev > 0 ? prev - 1 : 0))
      scrollIntoViewIfNeeded()
    } else if (e.key === 'Enter') {
      if (
        selectedResultIndex >= 0 &&
        selectedResultIndex < filteredResults.length
      ) {
        handleResultClick(filteredResults[selectedResultIndex])
      }
    } else if (e.key === 'Escape') {
      // Only close on explicit Escape key press
      setIsFocused(false)
      if (searchInputRef.current) {
        searchInputRef.current.blur()
      }
      // if (closeSearch) {
      //   closeSearch()
      // }
    }
  }

  const scrollIntoViewIfNeeded = () => {
    setTimeout(() => {
      const selectedElement = document.getElementById(
        `search-result-${selectedResultIndex}`
      )
      if (selectedElement && resultsContainerRef.current) {
        const container = resultsContainerRef.current
        const scrollTop = container.scrollTop
        const scrollBottom = scrollTop + container.clientHeight
        const elementTop = selectedElement.offsetTop
        const elementBottom = elementTop + selectedElement.clientHeight

        if (elementTop < scrollTop) {
          selectedElement.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth',
          })
        } else if (elementBottom > scrollBottom) {
          selectedElement.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth',
          })
        }
      }
    }, 10)
  }

  const totalResults =
    counts.events +
    counts.announcements +
    counts.benedictoryCourses +
    counts.temporaryPages

  const showResults =
    query.length >= 2 && (isLoading || hasSearched)

  return (
    <div ref={searchBoxRef} className="relative w-full ">
      <div className="relative">
        <div className="flex items-center w-full">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search events, announcements, courses, and pages..."
            className={clsx(
              'w-full p-2 pl-3 border-1 border-[#EAE0D3] rounded focus:outline-none shadow-sm transition-all relative',
              isMobile ? 'text-base' : 'text-lg'
            )}
            aria-label="Search"
            autoFocus
          />
          {query.length > 0 && (
            <button
              onClick={() => {
                handleClearSearch()
                setIsFocused(false)
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search and close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {isLoading && (
          <div className="absolute right-14 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {showResults && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 w-full mt-2 z-[99999] md:z-50 bg-white rounded shadow-xl border border-gray-200"
         
        >
          {/* Shimmer Effect when loading */}
          {isLoading && (
            <>
              <div className="p-3 bg-white rounded-t-lg">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {/* Shimmer Filter Buttons */}
                  <div className="px-3 py-2 rounded font-medium flex items-center gap-2 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm bg-gray-200 animate-pulse">
                    <div className="w-16 h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="px-2 py-2 rounded font-medium flex items-center gap-1 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm bg-gray-200 animate-pulse">
                    <div className="w-12 h-3 bg-gray-300 rounded"></div>
                  </div>
                  <div className="px-2 py-2 rounded font-medium flex items-center gap-1 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm bg-gray-200 animate-pulse">
                    <div className="w-12 h-3 bg-gray-300 rounded"></div>
                  </div>
                  <div className="px-2 py-2 rounded font-medium flex items-center gap-1 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm bg-gray-200 animate-pulse">
                    <div className="w-12 h-3 bg-gray-300 rounded"></div>
                  </div>
                  <div className="px-2 py-2 rounded font-medium flex items-center gap-1 whitespace-nowrap flex-shrink-0 text-xs sm:text-sm bg-gray-200 animate-pulse">
                    <div className="w-12 h-3 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="h-[1px] w-full bg-[#EAE0D3]"></div>
              <ul className="sm:max-h-96 max-h-[60vh] overflow-y-auto divide-y divide-gray-100">
                {/* Shimmer Search Results */}
                {[...Array(5)].map((_, index) => (
                  <li key={index} className="px-4 py-3 animate-pulse">
                    <div className="flex justify-between items-start">
                      <div className="flex w-full">
                        {/* Left Icon Shimmer */}
                        <div className="w-[11px] h-[13px] bg-gray-300 rounded flex-shrink-0 mt-1"></div>

                        {/* Right Content Shimmer */}
                        <div className="ml-2 flex-1">
                          {/* Title Shimmer */}
                          <div
                            className="h-[15px] bg-gray-300 rounded mb-2"
                            style={{
                              width: `${Math.random() * 40 + 40}%`, 
                            }}
                          ></div>

                          {/* Description Shimmer - 2 lines */}
                          <div className="space-y-1">
                            <div
                              className="h-[17px] bg-gray-200 rounded"
                              style={{
                                width: `${Math.random() * 20 + 70}%`, 
                              }}
                            ></div>
                            <div
                              className="h-[17px] bg-gray-200 rounded"
                              style={{
                                width: `${Math.random() * 30 + 50}%`, 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Actual Results */}
          {!isLoading && hasSearched && filteredResults.length > 0 && (
            <>
              <div className="p-3 bg-white rounded-t-lg">
                {Object.keys(counts).some(
                  (key) => counts[key as keyof typeof counts] > 0
                ) && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    <button
                      onClick={(e) => handleFilterClick('all', e)}
                      onTouchEnd={(e) => {
                        e.preventDefault()
                        handleFilterClick('all', e)
                      }}
                      className={clsx(
                        'px-3 py-2 rounded font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap flex-shrink-0',
                        'text-xs sm:text-sm',
                        activeFilter === 'all'
                          ? 'bg-[#F47527] text-white shadow-md'
                          : 'bg-[#A89883] text-white'
                      )}
                    >
                      <span>ALL ({totalResults})</span>
                    </button>

                    {Object.entries(COLLECTION_CONFIG).map(
                      ([key, config]) =>
                        counts[key as keyof typeof counts] > 0 && (
                          <button
                            key={key}
                            onClick={(e) =>
                              handleFilterClick(key as CollectionType, e)
                            }
                            onTouchEnd={(e) =>
                              handleFilterClick(key as CollectionType, e)
                            }
                            className={clsx(
                              'px-2 py-2 rounded font-medium transition-all duration-200 flex items-center gap-1 text-[#FFFFFF] uppercase whitespace-nowrap flex-shrink-0',
                              'text-xs sm:text-sm', // Responsive text size
                              activeFilter === key
                                ? `bg-[#F47527] shadow-md`
                                : `bg-[#A89883]`
                            )}
                          >
                            <span className="flex items-center gap-1">
                              <FontAwesomeIcon
                                icon={config.icon}
                                className="w-[10px] h-[12px] sm:w-[11px] sm:h-[13px] text-[#FFFFFF]"
                              />
                              <span className="text-xs sm:text-sm">
                                {config.name} (
                                {counts[key as keyof typeof counts]})
                              </span>
                            </span>
                          </button>
                        )
                    )}
                  </div>
                )}
              </div>
              <div className="h-[1px] w-full bg-[#EAE0D3]"></div>
              <ul
                ref={resultsContainerRef}
                className="sm:max-h-96 max-h-[60vh] overflow-y-auto divide-y divide-gray-100"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                }}
                onTouchMove={(e) => e.stopPropagation()}
              >
                {filteredResults.map((result, index) => {
                  const config = COLLECTION_CONFIG[result.collection]
                  if (!config) return null

                  let touchStartY = 0
                  let touchStartTime = 0
                  let hasMoved = false

                  return (
                    <li
                      id={`search-result-${index}`}
                      key={`${result.collection}-${result.id}`}
                      className={clsx(
                        'px-4 py-3 cursor-pointer transition-colors select-none',
                        {
                          'bg-gray-100': selectedResultIndex === index,
                          'hover:bg-gray-50': selectedResultIndex !== index,
                        }
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleResultClick(result)
                      }}
                      onTouchStart={(e) => {
                        touchStartY = e.touches[0].clientY
                        touchStartTime = Date.now()
                        hasMoved = false
                      }}
                      onTouchMove={(e) => {
                        const touchY = e.touches[0].clientY
                        const moveDistance = Math.abs(touchY - touchStartY)
                        if (moveDistance > 10) {
                          hasMoved = true
                        }
                      }}
                      onTouchEnd={(e) => {
                        const touchEndTime = Date.now()
                        const touchDuration = touchEndTime - touchStartTime

                        if (!hasMoved && touchDuration < 300) {
                          e.preventDefault()
                          e.stopPropagation()
                          handleResultClick(result)
                        }
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex">
                          {/* Left Icon */}
                          <FontAwesomeIcon
                            icon={config.icon}
                            className="w-[11px] h-[13px] text-[#A89883] flex-shrink-0"
                          />

                          {/* Right Content */}
                          <div className="ml-2 flex-1">
                            {/* Title */}
                            <h3 className="font-bold text-[12px] leading-[15px] font-inter text-[#F47527] tracking-tight">
                              {result.title.length > 50
                                ? result.title.slice(0, 60) + '...'
                                : result.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 mt-1 font-normal text-[12px] leading-[17px] font-inter line-clamp-2">
                              {cleanDescription(result.description)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </>
          )}

         
          {!isLoading &&
            hasSearched &&
            query.length >= 2 &&
            filteredResults.length === 0 && (
              <ul className="sm:max-h-96 max-h-[60vh] overflow-y-auto divide-y divide-gray-100">
                <li className="p-6 text-center text-gray-500">
                  No results found for "{query}".
                </li>
              </ul>
            )}
        </div>
      )}
    </div>
  )
})

SearchBox.displayName = 'SearchBox'

export default SearchBox