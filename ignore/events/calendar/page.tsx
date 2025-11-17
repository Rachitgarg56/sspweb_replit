import BreadCrumbs from "../../../app/components/BreadCrumbs";

export default function calendar() {

  let breadcrumbs = [
    {title: "Home", link: "/"},
    {title: "Events", link: "/events"},
    {title: "Calendar", link: "/events/calendar"},
  ]
  
  const breadcrumbsSeperator = '|';

  return(
    <div>
      <div className="bg-[var(--gray-100)] p-8 md:pl-40 md:pr-32 pb-12 md:pb-4">
        <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator}/>
      </div>
    </div>
  )

};