'use client';
import { use, useEffect, useState } from "react";
import Aside from "../../components/Aside";
import DeityComponent from "../../components/DeityComponent";
import BreadCrumbs from "../../components/BreadCrumbs";
import Loader from "../../components/Loader";
import { Deity } from "@/app/src/types";
import withStotras from "@/utils/hoc/withStotras";
import { transliterate } from '@/utils/helpers';

interface Props {
    data: { deityData: Deity, deitiesData: Deity[]};
    isLoading: boolean;
    lang1: string;
    lang2: string;
    setLang1: (lang1: string) => void;
    setLang2: (lang2: string) => void;
}

const PageContent = ({ data, isLoading, lang1, lang2, setLang1, setLang2 }: Props) => {
    const { deityData, deitiesData } = data;

    const breadcrumbs = [
      { title: "Home", link: "/" },
      { title: "Resources", link: "/resources", desktopClick: false },
      { title: "Stotras", link: "/stotras" },
      { title: deityData.url, link: `/stotras/${deityData.url}` },
    ]
    
    const breadcrumbsSeperator = "|"
   
    const [quickIndexes, setQuickIndexes] = useState<{ title: string, link: string }[]>([]);
  
    const headingIAST = deityData?.title?.find((obj) => obj.lang === 'en')?.value;
    const scheme = 'iast';
    const firstHeading = transliterate(headingIAST, scheme, lang1);
    const secondHeading = lang2 != 'none' ? (transliterate(headingIAST, scheme, lang2)) : "";

    useEffect(() => {
        const qi = deitiesData?.map(deity => {
            const title = deity?.title?.find(t => t.lang === 'en').value
            const link = `/stotras/${deity.url}`
            return { title, link } 
        })
        setQuickIndexes(qi);
    },[deityData])

    return (
        <div className="bg-[--gray-200]">
            <div className="container mx-auto px-6 pb-8 md:pb-20 flex flex-col ">
                <div className="max-w-[1175px] w-full mx-auto py-8">
                    <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator} />
                </div>
                <section>
                    <div className="max-w-[1175px] m-auto flex flex-col gap-4">
                    <div className="page-main-inner-container flex gap-6 relative max-md:flex-col">
                        <Aside
                        indexes={quickIndexes}
                        isDeitiesPage={'true'}
                        lang1={lang1}
                        lang2={lang2}
                        setLang1={setLang1}
                        setLang2={setLang2}
                        highlight="var(--resources)"
                        />
                        <div className="bg-white w-full flex flex-col gap-4 py-6 px-14 max-sm:px-6">
                        <h1 className="text-center font-normal font-pt-serif text-[37px] text-[#BA302A] max-sm:text-2xl">
                            {firstHeading}
                        </h1>
                        <h1 className="text-center font-normal font-pt-serif text-[37px] -mt-4 text-[#BA302A] mb-4 max-sm:text-2xl">
                            {secondHeading}
                        </h1>
                        <hr />
                        {
                            isLoading ? 
                            <Loader text="Deity" color="var(--resources)"/> : 
                            <div className="mt-8 flex flex-col gap-12">
                                <DeityComponent
                                isSingleDeity={true}
                                deity={deityData}
                                lang1={lang1}
                                lang2={lang2}
                                />
                            </div>
                        }
                        </div>
                    </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default withStotras(PageContent)
