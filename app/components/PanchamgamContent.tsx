import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";

// Panchangam Data (Years & PDFs)
const panchangamData = [
  {
    year: "2025",
    kannada: "/assets/documents/panchangam/Kannada_Panchanga2025-26.pdf",
    tamil: "/assets/documents/panchangam/Visuvavasu-Panchangam_25-26.pdf",
    telugu: ["/assets/documents/panchangam/Telugu-1-Viswavasu_Telugu_Panchangam_2025-26_Sringeri.pdf",
            "/assets/documents/panchangam/Telugu-2-sringeri-2025-26-panchangam_Telugu_Shankara_Manchi.pdf"],
    detail: {
      sanskrit: "विश्वावसु",
      roman: "viśvāvasu",
    },
    isNew: true,
  },
  {
    year: "2024",
    kannada: "/assets/documents/panchangam/2024_25_krodhi_kannada_panchanga_sringeri.pdf",
    tamil: "/assets/documents/panchangam/2024_25_krodhi_tamil_panchanga_sringeri.pdf",
    telugu: "/assets/documents/panchangam/2024_25_krodhi_telugu_panchanga_sringeri.pdf",
    detail: {
      sanskrit: "क्रोधी",
      roman: "krodhī",
    },
  },
  {
    year: "2023",
    kannada: "/assets/documents/panchangam/Panchanga2023.pdf",
    tamil: "/assets/documents/panchangam/Sobhakrithu-Panchangam-23-24-3.pdf",
    telugu: "/assets/documents/panchangam/SobhakrithTeluguPanchangam_2023-24_Updated.pdf",
    detail: {
      sanskrit: "शोभकृत्",
      roman: "śobhakṛt",
    },
  },
  {
    year: "2022",
    kannada: "/assets/documents/panchangam/2022_23_shubhakrit_kannada_panchanga_sringeri.pdf",
    tamil: "/assets/documents/panchangam/2022_23_shubhakrit_tamil_panchangam_sringeri.pdf",
    telugu: "/assets/documents/panchangam/2022_23_shubhakrit_telugu_panchangam_sringeri.pdf",
    detail: {
      sanskrit: "शुभकृत्",
      roman: "śubhakṛt",
    },
  },
  {
    year: "2021",
    kannada: "/assets/documents/panchangam/kannada_panchanga_2021_22_plava_samvatsara.pdf",
    tamil: "/assets/documents/panchangam/Sri-Pilava-Panchangam-21-22.pdf",
    telugu: "/assets/documents/panchangam/telugu_panchanga_2021_22_plava_samvatsara.pdf",
    detail: {
      sanskrit: "प्लव",
      roman: "plava",
    },
  },
  {
    year: "2020",
    kannada: "/assets/documents/panchangam/kannada_panchanga_2020_2021_shaarvari_samvatsara.pdf",
    tamil: "/assets/documents/panchangam/tamil_panchangam_2020_2021_shaarvari_samvatsara.pdf",
    telugu: "/assets/documents/panchangam/telugu_panchangam_2020_2021_shaarvari_samvatsara.pdf",
    detail: {
      sanskrit: "शार्वरी",
      roman: "śārvarī",
    },
  },
  {
    year: "2019",
    kannada: "/assets/documents/panchangam/kannada_panchanga_2019_2020_vikari_samvatsara.pdf",
    tamil: "/assets/documents/panchangam/tamil_panchangam_2019_2020_vikari_samvatsara.pdf",
    telugu: "/assets/documents/panchangam/telugu_panchangam_2019_2020_vikari_samvatsara.pdf",
    detail: {
      sanskrit: "विकारी",
      roman: "vikārī",
    },
  },
  { 
    year: "2018", 
    kannada: "/assets/documents/panchangam/kannada_panchanga_2018_2019_vilamba_samvatsara.pdf", 
    tamil: "", 
    telugu: "/assets/documents/panchangam/telugu_panchangam_2018_2019_vilamba_samvatsara.pdf",
    detail: {
      sanskrit: "विलम्ब",
      roman: "vilamba",
    },
  },
  { 
    year: "2017", 
    kannada: "/assets/documents/panchangam/kannada_panchanga_2017_2018_hemalamba_samvatsara.pdf", 
    tamil: "/assets/documents/panchangam/tamil_panchangam_2017_2018_hemalamba_samvatsara.pdf", 
    telugu: "/assets/documents/panchangam/telugu_panchangam_2017_2018_hemalamba_samvatsara.pdf",
    detail: {
      sanskrit: "हेमलम्ब",
      roman: "hemalamba",
    },
  },
  { 
    year: "2016", 
    kannada: "/assets/documents/panchangam/Pachanga_Kannada_2016-17_Durmukha.pdf", 
    tamil: "/assets/documents/panchangam/Panchanga_Tamil_2016-17_Durmukha.pdf", 
    telugu: "",
    detail: {
      sanskrit: "दुर्मुख",
      roman: "durmukha",
    },
  },
  { 
    year: "2015", 
    kannada: "/assets/documents/panchangam/kannada_panchanga_2015-16.pdf", 
    tamil: "/assets/documents/panchangam/manmatha_nama_samvatsara_2015_16_tamil_panchangam.pdf", 
    telugu: "",
    detail: {
      sanskrit: "मन्मथ",
      roman: "manmatha",
    },
  },
  { 
    year: "2014", 
    kannada: "/assets/documents/panchangam/jayanama-samvatshrasya2014-15.pdf", 
    tamil: "/assets/documents/panchangam/tamil-panchangam-2014-2015.pdf", 
    telugu: "",
    detail: {
      sanskrit: "जय",
      roman: "jaya",
    },
  },
  { 
    year: "2013", 
    kannada: "/assets/documents/panchangam/panchanga-2013-14-kannada.pdf", 
    tamil: "/assets/documents/panchangam/panchangam-tamil-2013-14.pdf", 
    telugu: "",
    detail: {
      sanskrit: "विजय",
      roman: "vijaya",
    },
  },
  { 
    year: "2012", 
    kannada: "/assets/documents/panchangam/2012_kannada_panchangam.pdf", 
    tamil: "/assets/documents/panchangam/tamil_panchangam_nandana_2012.pdf", 
    telugu: "",
    detail: {
      sanskrit: "नन्दन",
      roman: "nandana",
    },
  },
  { 
    year: "2011", 
    kannada: "/assets/documents/panchangam/kannada_2011.pdf", 
    tamil: "/assets/documents/panchangam/tamil-panchangam_proc.pdf", 
    telugu: "",
    detail: {
      sanskrit: "खर",
      roman: "khara",
    },
  },
  { 
    year: "2010", 
    kannada: "/assets/documents/panchangam/2010_kannada.pdf", 
    tamil: "", telugu: "",
    detail: {
      sanskrit: "विकृति",
      roman: "vikṛti",
    },
  },
  { 
    year: "2009", 
    kannada: "/assets/documents/panchangam/2009_kannada.pdf", 
    tamil: "", telugu: "",
    detail: {
      sanskrit: "विरोधि",
      roman: "virodhi",
    }, 
  },
];

// PDF Icon Component with Link
const PdfLink = ({ url }: { url: string }) => {
  return url ? (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <img
        src="/assets/images/gallery/panchangam/pdf_image_icon.jpg" 
        alt="PDF"
        className="w-6 h-6 mx-auto"
      />
    </Link>
  ) : (
    "-"
  );
};

const PanchangamContent = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[600px] w-full bg-white border border-gray-300">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-3 text-center font-semibold text-gray-900">Year</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-900">Kannada</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-900">Tamil</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-900">Telugu</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {panchangamData.map((item, index) => (
              <tr key={uuidv4()} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {/* Year Column with "NEW" Label */}
                <td className="px-4 py-3 text-sm text-gray-900 text-center font-medium max-w-[100px]">
                  <div>
                    <span>{item.year}</span>
                    {item.isNew && <span className="text-red-500 font-bold text-xs ml-2">NEW</span>}
                  </div>
                  <span>{item.detail?.sanskrit + " ( " + item.detail?.roman + " ) "}</span>
                </td>

                {/* Kannada PDF Link */}
                <td className="px-4 py-3 text-center">
                  <PdfLink url={item.kannada} />
                </td>

                {/* Tamil PDF Link */}
                <td className="px-4 py-3 text-center">
                  <PdfLink url={item.tamil} />
                </td>

                {/* Telugu PDF Link */}
                <td className="px-4 py-3 text-center">
                  {
                    Array.isArray(item.telugu) ? 

                    <div className="flex items-center gap-2 justify-center">
                      {
                        item.telugu.map(tel => {
                          return <PdfLink url={tel} />
                        }) 
                      }
                    </div> :

                    <PdfLink url={item.telugu} />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PanchangamContent;
