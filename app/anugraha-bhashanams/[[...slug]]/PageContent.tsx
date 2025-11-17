"use client"

import BreadCrumbs from "../../components/BreadCrumbs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { use, useEffect, useState } from "react"
import { formatDate } from "../../../utils/formatters"
import { Modal } from "../../components/Modal"
import { useParams } from "next/navigation"
import { API_URL } from "../../../config/api";
import Loader from "@/app/components/Loader"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { DROPDOWN_ICON } from "@/public/assets/svgs/svg";

interface Course {
  id: string
  title: string
  description: string
  videoId: string
  language: { short: string; full: string }
  createdAt: { seconds: number; nanoseconds: number };
  liveFrom: { seconds: number; nanoseconds: number };
  videoRuntime: { hours: number; minutes: number };
  slug: string;
}

const langs = [
  { short: "sa", full: "Sanskrit" },
  { short: "hi", full: "Hindi" },  
  { short: "ta", full: "Tamil" },
  { short: "kn", full: "Kannada" },
  { short: "te", full: "Telugu" },
  { short: "gj", full: "Gujarati" },
  { short: "en", full: "Roman Transliteration" },
]

export default function benedictoryCourses() {

  const params = useParams();
  const slugArray = params?.slug as string[] | undefined; 

  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "Resources", link: "/resources", desktopClick: false },
    { title: "Benedictory Discourses", link: "/anugraha-bhashanams" },
  ]
  const breadcrumbsSeperator = "|"

  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["All"])
  const [paginatedCourses, setPaginatedCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const coursesPerPage = 4

  const [isOpen, setIsOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currCourseIdx, setCurrCourseIdx] = useState(0);
  const [prevCourse, setPrevCourse] = useState<Course | null>(null);
  const [nextCourse, setNextCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (!filteredCourses.length) {
      setSelectedCourse(null);
      setNextCourse(null);
      setPrevCourse(null);
      return;
    }
  
    const totalCourses = filteredCourses.length;
  
    let safeIndex = ((currCourseIdx % totalCourses) + totalCourses) % totalCourses;
    const currCourse = filteredCourses[safeIndex];
    window.history.pushState({},"",`/anugraha-bhashanam/${currCourse?.language?.full?.toLowerCase()}/${currCourse?.slug}`)
  
    setSelectedCourse(currCourse);
    setNextCourse(filteredCourses[(safeIndex + 1) % totalCourses]);
    setPrevCourse(filteredCourses[(safeIndex - 1 + totalCourses) % totalCourses]);
  
  }, [currCourseIdx]);  

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}anugraha-bhashanams`)
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`)
        }
        const data = await response.json()
  
        const sortedCourses = data.data.sort((a: Course, b: Course) => b.liveFrom.seconds - a.liveFrom.seconds);
  
        setCourses(sortedCourses)
        setFilteredCourses(sortedCourses)
        setIsLoading(false)
      } catch (err: any) {
        setError(err.message)
        setIsLoading(false)
      }
    }
  
    fetchCourses()
  }, [])

  useEffect(() => {
    if (slugArray?.length === 2) {
      const lang = slugArray[0];
      const slug = slugArray[1];
      handleViewClick(slug, lang);
    }
  }, [courses]);
  
  // Function to filter courses based on selected languages
  const filterCoursesByLanguage = () => {
    if (selectedLanguages.includes("All")) {
      setFilteredCourses(courses)
    } else {
      const filtered = courses.filter((course) => selectedLanguages.includes(course?.language?.full))
      setFilteredCourses(filtered)
    }
  }

  // Handle language checkbox change
  const handleLanguageChange = (lang: string) => {
    if (lang === "All") {
      if (!selectedLanguages.includes("All")) {
        setSelectedLanguages(["All"])
      }
    } else {
      const updatedLanguages = selectedLanguages.includes(lang)
        ? selectedLanguages.filter((l) => l !== lang)
        : [...selectedLanguages.filter((l) => l !== "All"), lang]

      if (!updatedLanguages.length) {
        setSelectedLanguages(["All"])
      } else {
        setSelectedLanguages(updatedLanguages)
      }
    }
  }

  // Run filterCoursesByLanguage whenever selectedLanguages changes
  useEffect(() => {
    filterCoursesByLanguage()
    setCurrentPage(1)
  }, [selectedLanguages])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  function sortCourses(sortOrder: string) {
    const coursesToSort = [...filteredCourses]

    if (sortOrder === "ascending") {
      const sortedCourses = coursesToSort.sort((a, b) => a.liveFrom.seconds - b.liveFrom.seconds)
      setFilteredCourses(sortedCourses)
    } else if (sortOrder === "descending") {
      const sortedCourses = coursesToSort.sort((a, b) => b.liveFrom.seconds - a.liveFrom.seconds)
      setFilteredCourses(sortedCourses)
    }
  }

  useEffect(() => {
    const startIndex = (currentPage - 1) * coursesPerPage
    const endIndex = startIndex + coursesPerPage
    const pc = filteredCourses.slice(startIndex, endIndex)
    setPaginatedCourses(pc)
    setTotalPages(Math.ceil(filteredCourses.length / coursesPerPage))
  }, [filteredCourses, currentPage, coursesPerPage])

  
  function handleViewClick(slug: string, lang: string, id?: string) {
    window.history.pushState({},"",`/anugraha-bhashanam/${lang.toLowerCase()}/${slug}`)
    setIsOpen(true) 
    const clickedCourse = courses.find(course => course.slug === slug) || null;
    const index = filteredCourses.findIndex(course => course.id === id)  
    setCurrCourseIdx(index);

    setSelectedCourse(clickedCourse);    
    setNextCourse(filteredCourses[index+1])
    setPrevCourse(filteredCourses[index-1])
  }

  return (
    <section className="p-4 bg-[--gray-100]">
      <div className="max-w-[1175px] m-auto py-4 md:pb-20">
        <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator} />
      </div>
      <div className="max-w-[1175px] m-auto flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <div className="min-w-72 max-lg:hidden"></div>
        <h1 className="text-center max-sm:text-2xl max-md:text-3xl text-4xl mb-5 text-[var(--resources)] font-pt-serif w-full">Benedictory Discourses & Pravachans</h1>
      </div>
        <div className="page-main-inner-container flex gap-6 relative max-lg:flex-col pb-14">
          {/* aside code */}
          <aside className="flex flex-col gap-6 min-w-72">
            <div className="bg-[#FFFFFF] p-6 flex flex-col gap-6 sticky top-0 max-[462px]:p-4">
            <h2 className="text-[#7e6f5c] text-[17px] font-pt-serif flex items-center gap-1">
              <FontAwesomeIcon icon={faSliders} className="text-[16px] opacity-[46%] text-[var(--brown-medium)]" />
              Filter
            </h2>
              <hr />
              <ul className="flex flex-col items-start gap-2 max-lg:flex-row max-lg:gap-8 max-lg:flex-wrap max-[462px]:gap-4">
                <li className="flex flex-row-reverse cursor-pointer items-center gap-2 text-[#7e6f5c]">
                  <label className={`${selectedLanguages.includes('All') ? 'text-[var(--resources)]' : ''} text-sm font-pt-serif cursor-pointer`} htmlFor="all">All</label>
                  <input
                    id="all"
                    type="checkbox"
                    className="cursor-pointer accent-[var(--resources)]"
                    checked={selectedLanguages.includes("All")}
                    onChange={() => handleLanguageChange("All")}
                  />
                </li>
                {langs.map((lang) => (
                  <li key={lang.short} className="flex flex-row-reverse cursor-pointer items-center gap-2 text-[#7e6f5c]">
                    <label className={`${selectedLanguages.includes(lang.full) ? 'text-[var(--resources)]' : ''} text-sm font-pt-serif cursor-pointer`} htmlFor={lang.short}>{lang.full}</label>
                    <input
                      id={lang.short}
                      type="checkbox"
                      className="cursor-pointer accent-[var(--resources)]"
                      checked={selectedLanguages.includes(lang.full)}
                      onChange={() => handleLanguageChange(lang.full)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* main section code */}
          <div className="flex flex-col gap-6 w-full py-4 px-12 bg-[#FFFFFF] max-lg:px-6 max-[462px]:px-4">
            {
              isLoading ? 
              <Loader text="Courses" color="var(--resources)" /> :
              <>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 flex-wrap">
                    {selectedLanguages.map((lang) => (
                      <span
                        className="bg-[--gray-100] whitespace-nowrap text-[var(--brown-medium)] px-3 py-1 rounded-sm text-[10.5px] font-bold"
                        key={lang}
                      >
                        {lang}
                      </span>
                    ))}
                    {selectedLanguages[0] !== "All" && selectedLanguages.length && (
                      <button
                        onClick={() => setSelectedLanguages(["All"])}
                        className="text-[var(--brown-light)] text-xs font-bold whitespace-nowrap"
                      >
                        X Clear Filters
                      </button>
                    )}
                  </div>
                  <div className="text-[var(--brown-dark)] flex items-center self-start">
                    <label className="text-[#93836E] text-[10.5px] font-inter font-medium" htmlFor="sort-by-upload-date">Sort:</label>
                    <div className="relative w-full flex items-center">
                      <select
                        className="custom-dropdown cursor-pointer text-[var(--brown-dark)] w-full text-[10.5px] font-inter font-semibold pr-5 pl-1"
                        onChange={(e) => sortCourses(e.target.value)}
                        name="sort-by-upload-date"
                        id="sort-by-upload-date"
                        >
                        <option value="descending">Most Recent</option>
                        <option value="ascending">Oldest First</option>
                      </select>
                      <div className="absolute pointer-events-none right-1 top-1/2 -translate-y-1/2 text-[11px] text-[--brown-dark]">
                        {DROPDOWN_ICON}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-2" />

                {/* all rendered Video cards */}
                <div className="flex flex-col gap-4">
                  {/* video card code */}
                  {isLoading ? (
                    <p className="text-[var(--brown-dark)]">Loading...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : paginatedCourses.length === 0 ? (
                    <p className="text-[var(--brown-dark)]">No courses found for the selected filters.</p>
                  ) : (
                    paginatedCourses.map((course,idx) => (
                      <div key={course?.id}>
                        <div className="flex w-full justify-between gap-4 p-4 bg-white rounded-lg max-md:p-0 max-sm:flex-col">
                          {/* Thumbnail Section */}
                          <div className="relative w-[43%] overflow-hidden shadow-lg max-sm:w-full">
                            <div className="relative w-full pb-[56.25%]">
                              <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${course?.videoId}`}
                                title="YouTube Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="flex flex-col justify-between gap-3 w-1/2 max-sm:w-full">
                            <div className="text-[10px] font-inter font-bold tracking-wide text-[var(--resources)] uppercase">
                              Uploaded on: {formatDate(course?.liveFrom)}
                            </div>

                            <div className="flex flex-col gap-4">
                              <h2 className="text-[17px] text-[#443D32] font-pt-serif leading-tight">
                                {course?.title}
                              </h2>

                              <div className="flex font-inter items-center gap-2 text-[var(--brown-medium)] text-[13px]">
                                <span>
                                  {String(course?.videoRuntime?.hours).padStart(2, '0')} hr :{" "}
                                  {String(course?.videoRuntime?.minutes).padStart(2, '0')} min
                                </span>
                                <span className="text-gray-400">|</span>
                                <span>{course?.language?.full}</span>
                              </div>

                              <button onClick={()=>handleViewClick(course?.slug, course?.language?.full, course?.id)} className="w-16 bg-[var(--brown-light)] hover:bg-stone-300 flex items-center justify-center font-inter font-semibold text-white py-2 uppercase text-[10px] rounded-[3px]">
                                view
                              </button>
                            </div>
                          </div>
                        </div>

                        <hr className="mt-4" />
                      </div>
                    ))
                  )}
                </div>

                {/* Pagination component */}
                <div className="relative max-w-[800px] overflow-x-auto scrollbar-none h-7 font-inter text-[9px] md:text-[13px]">
                  <div className="absolute top-0 left-0 flex justify-center items-center gap-4">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="disabled:opacity-50"
                    >
                      {/* &lt; */}
                      <ChevronLeft />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={currentPage === i + 1 ? "text-red-500" : "text-[#4B3729]"}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="disabled:opacity-50"
                    >
                      {/* &gt; */}
                      <ChevronRight />
                    </button>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
      </div>

      <Modal prevCourse={prevCourse} nextCourse={nextCourse} selectedCourse={selectedCourse} isOpen={isOpen} onClose={() => setIsOpen(false)} setCurrCourseIdx={setCurrCourseIdx} />

    </section>
  )
}

