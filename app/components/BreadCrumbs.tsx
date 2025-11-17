import Link from "next/link"
import type React from "react"

interface BreadcrumbItem {
  title: string
  link: string
  desktopClick?: boolean
}

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[]
  breadcrumbsSeperator?: React.ReactNode
}

const BreadCrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs, breadcrumbsSeperator = "/" }) => {
  return (
    <div className="w-full overflow-hidden">
      <ol className="breadcrumbs flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {breadcrumbs.map((crumb, idx) => (
          <li
            className="flex items-center gap-2 text-[#93836E] max-sm:text-[9px] text-[12px] font-inter font-medium min-w-0 flex-shrink-0"
            key={crumb.title}
          >
            <Link
              href={crumb.link}
              className={`
                truncate max-w-[120px] sm:max-w-[150px] md:max-w-[200px] hover:underline
                ${idx === breadcrumbs.length - 1 ? "text-[var(--brown-dark)]" : ""}
                ${crumb.desktopClick === false ? "md:pointer-events-none max-md:cursor-default" : ""} 
              `}
              title={crumb.title}
            >
              {crumb.title}
            </Link>
            {idx !== breadcrumbs.length - 1 && <span className="flex-shrink-0 text-[#d1c3b0]">{'/'}</span>}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default BreadCrumbs

