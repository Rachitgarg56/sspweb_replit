import Link from "next/link";
import BreadCrumbs from "../../components/BreadCrumbs";

let breadcrumbs = [
  { title: "Home", link: "/" },
  { title: "Contact", link: "/contact", desktopClick: false },
  { title: "Location", link: "/contact/location" },
];

const breadcrumbsSeperator = '|';

export async function generateMetadata() {
  return {
      title: "Location",
      description: "Location: Sri Sringeri Sharada Peetham",
      openGraph: {
          title: "Location",
          description: "Location: Sri Sringeri Sharada Peetham",
          images: [
              {
                  url: "/assets/images/main-page-cards/resources.jpg",
                  alt: "Location",
              },
          ],
          type: "website",
      }
  };
}


export default function Location() {
  return (
    <div className="min-h-screen bg-[--gray-100] py-8 text-[--brown-dark]">
      <div className="max-w-[1225px] mx-auto px-4 md:mb-12">
        <div className="py-2 mb-6">
              <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator}/>
        </div>
        <h1 className="text-[37px] text-[--contact] mb-8 text-center font-pt-serif">Our Location</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-8 shadow-md">
            <h3 className="text-[21px] font-pt-serif text-[--contact] mb-6">Physical Address</h3>
            <p className="text-[var(--brown-dark)] text-[13px] font-inter">C793+F59 Sri Math, near Temple,<br /> Sringeri, Karnataka 577139, India</p>
            <Link href={'https://www.google.co.in/maps/place/Shri+Jagadguru+Shankaracharya+Mahasamsthana+Dakshinamnaya+Shri+Sharada+Peeta/@13.4161409,75.2487638,17z/data=!3m1!4b1!4m6!3m5!1s0x3a526f5f277262e7:0xed1591d514d1acca!8m2!3d13.4161409!4d75.2513387!16zL20vMDZfd3p2?entry=ttu&g_ep=EgoyMDI1MDMwMy4wIKXMDSoASAFQAw%3D%3D'}>
              <button className="mt-4 px-4 py-2 bg-[--contact] text-white rounded-[3px] shadow text-[10.5px] font-inter font-semibold tracking-[0.16px] uppercase">
                Google Map
              </button>
            </Link>
          </div>
          <div className="bg-white p-8 shadow-md">
            <h3 className="text-[21px] font-pt-serif text-[--contact] mb-6">Postal Address</h3>
            <p className="text-[var(--brown-dark)] text-[13px] font-inter">The Administrator,<br />
              Sringeri Math and its Properties,<br />
              Sringeri, Chikkamagaluru District,<br />
              Karnataka - 577139</p>
          </div>
        </div>
        <div className="mt-6">
          <iframe className="w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982160.9147919323!2d75.17711353275847!3d12.918708511209704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbb4163302b1b15%3A0x60508b7cede515a8!2sSringeri%20Shree%20Sharadambe%20Devi%20Temple!5e0!3m2!1sen!2sin!4v1743251884539!5m2!1sen!2sin" width="800" height="685"  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  );
}
