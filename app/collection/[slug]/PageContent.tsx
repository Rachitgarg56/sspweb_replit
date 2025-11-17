'use client';
import { use, useEffect, useState } from "react";
import Aside from "../../components/Aside";
import DeityComponent from "../../components/DeityComponent";
import BreadCrumbs from "../../components/BreadCrumbs";
import { API_URL } from "../../../config/api";
import { useLoading } from "@/context/LoadingProvider";
import Loader from "../../components/Loader";
import { Deity } from "../../src/types";
import { Collection } from "../../src/types";
import { transliterate } from "@/utils/helpers";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const PageContent = ({ params }: PageProps) => {
    const { slug } = use(params);
    
    const { isLoading, setLoading } = useLoading();
    const [currFocusedDeity, setCurrFocusedDeity] = useState(0);

    const breadcrumbs = [
      { title: "Home", link: "/" },
      { title: "Resources", link: "/resources", desktopClick: false },
      { title: "Stotras", link: "/stotras" },
      { title: slug, link: `/collection/${slug}` },
    ]
    
    const breadcrumbsSeperator = "|"
   
    const [lang1, setLang1] = useState("devanagari");
    const [lang2, setLang2] = useState("iast");
    const [collection, setCollection] = useState<Collection>({
        deities: [],
        title: [],
        url: '',
    });
    const [quickIndexes, setQuickIndexes] = useState<string[]>([]);
  
    const headingIAST = collection?.title?.find((obj) => obj.lang === 'en')?.value || "";
    const scheme = 'iast';
    const firstHeading = transliterate(headingIAST, scheme, lang1);
    const secondHeading = lang2 != 'none' ? (transliterate(headingIAST, scheme, lang2)) : "";

    function updateFocusedDeity(index: number){
      setCurrFocusedDeity(index);
    }
  
    useEffect(() => {
      async function getCollection() {
        setLoading(true);
        try {
          const res = await fetch(`${API_URL}collection/${slug}`);
          const parsedRes = await res.json();
          setCollection(parsedRes);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
      getCollection();
    }, [setLoading])
  
    useEffect(() => {
      const qi = collection?.deities?.map((d: Deity) => {
        const titleArr = d?.title;
        const arr = titleArr?.filter((obj) => obj.lang === "en");
        return arr[0]?.value || "";
      });    
      setQuickIndexes(qi);
    }, [collection.deities])

    return (
      <>
        <div className="bg-[--gray-200]">
        <div className="container mx-auto px-6 pb-8 md:pb-20 flex flex-col ">
            <div className="max-w-[1175px] w-full mx-auto py-8">
            <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator} />
            </div>
            <section>
                <div className="max-w-[1175px] m-auto flex flex-col gap-4">
                <div className="page-main-inner-container flex gap-6 relative max-md:flex-col">
                    <Aside
                    isStotrasPage={'true'}
                    quickIndexes={quickIndexes}
                    lang1={lang1}
                    lang2={lang2}
                    setLang1={setLang1}
                    setLang2={setLang2}
                    currFocusedDeity={currFocusedDeity}
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
                        <Loader text="Stotras" color="var(--resources)"/> : 
                        <div className="mt-8 flex flex-col gap-12">
                        {collection?.deities?.map((deity: Deity, idx: number) => (
                            <DeityComponent
                            index={idx+""}
                            deity={deity}
                            lang1={lang1}
                            lang2={lang2}
                            key={deity.id}
                            updateFocusedDeity={updateFocusedDeity}
                            />
                        ))}
                        </div>
                    }
                    </div>
                </div>
                </div>
            </section>
        </div>
        </div>
      </>
    )
}

export default PageContent