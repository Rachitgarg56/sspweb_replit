"use client"
import { type ReactNode, useEffect, useState } from "react"
import { API_URL } from "../.././config/api";

interface Page {
  title: string
  content: ReactNode
  link: string
}

export default function AboutPageMainSection() {
  const [pages, setPages] = useState<Page[]>([])
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function getPages() {
      const res = await fetch(`${API_URL}tp`)
      const parsedRes = await res.json()
      setPages(parsedRes)
    }
    getPages()
  }, [])

  const handlePageClick = (page: Page) => {
    setSelectedPage(page)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section className="p-4 bg-[#F7F2EC]">
      <div className="max-w-[1175px] m-auto flex flex-col gap-4">
        <div className="page-main-inner-container flex gap-6 relative max-md:flex-col">
          <div className="bg-[#FFFFFF] w-full flex flex-col gap-4 py-6 px-14 max-sm:px-6 shadow-md">
            <h1 className="text-center font-semibold text-3xl text-[#4D809F] mb-4 max-sm:text-2xl">Temporary Pages</h1>
            <hr />
            <div className="mt-8 flex flex-col gap-12">
              <ul className="flex flex-col gap-2">
                {pages.map((page, index) => (
                  <li key={index} onClick={() => handlePageClick(page)} className="cursor-pointer hover:underline">
                    {"http:localhost:3000/tp/" + page.link}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-7xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedPage?.title}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                > 
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div dangerouslySetInnerHTML={{__html: selectedPage?.content || ""}} className="mt-4"></div>
          </div>
        </div>
      )}
    </section>
  )
}

