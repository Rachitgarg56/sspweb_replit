'use client'

import Aside from '../../../components/Aside';
import BreadCrumbs from '../../../components/BreadCrumbs';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loader from '@/app/components/Loader';
import withStotras from "@/utils/hoc/withStotras";
import { Deity, Stotra } from '@/app/src/types';
import { transliterate } from '@/utils/helpers';

interface Shloka {
    id: string;
    orderId: string;
    title: { lang: string, value: string } [];
}

interface Params {
    deity?: string;   
    stotra?: string;  
}

interface ShlokaTitle {
    lang: string;
    value: string;
}

interface Props {
  isLoading: boolean;
  data: { stotra: Stotra, shlokas: Shloka[], deity: Deity };
  lang1: string;
  lang2: string;
  setLang1: (lang1: string) => void;
  setLang2: (lang2: string) => void;
}

const PageContent = ({ data, isLoading, lang1, lang2, setLang1, setLang2 }: Props) => {
    const { stotra: selectedStotra, shlokas: shlokas, deity: deityData } = data;

    const [quickIndexes, setQuickIndexes] = useState<{ title: string, link: string }[]>([]);

    const params = useParams() as Params;
    const deity = params.deity;
    const stotra = params.stotra;
    
    const decodedDeityName = deity ? decodeURIComponent(deity) : undefined;
    const decodedStotraName = stotra ? decodeURIComponent(stotra) : undefined;

    const headingIAST = selectedStotra?.title?.find((obj) => obj.lang === 'en')?.value;
    const scheme = 'iast';
    const firstHeading =  transliterate(headingIAST, scheme, lang1) || "";
    const secondHeading = lang2 != 'none' ? (transliterate(headingIAST, scheme, lang2) || "") : "";
    const audioPath = selectedStotra?.audioPath;

    useEffect(() => {
      const qi = deityData?.stotras?.map(stotra => {
        const title = stotra?.title?.find(t => t.lang === 'en').value
        const link = `/stotras/${deityData.url}/${stotra.url}`
        return { title, link } 
      })

      setQuickIndexes(qi);
    },[deityData])

    const getInLang = (_arr: ShlokaTitle[], _lang: string): string => {
        return _arr.find(a => a.lang === _lang)?.value ?? '';
    };

    const breadcrumbs = [
        { title: "Home", link: "/" },
        { title: "Resources", link: "/resources", desktopClick: false },
        { title: "Stotras", link: "/stotras" },
        { title: decodedDeityName, link: `/stotras/${decodedDeityName}`, desktopClick: false },
        { title: decodedStotraName, link: `/stotras/${decodedDeityName}/${decodedStotraName}` },
    ]
    const breadcrumbsSeperator = "|"

    // tamil shlokas for stotra with id 'wGNFjMwZyn6qIV518AWy'
    const tamilShlokas = [
      `மம ஶ்ரீது₃ர்கா₃பரமேஶ்வரீப்ரஸாதே₃ன
       சிந்திதஸகலமனோரத₂ஸித்₃த்₄யர்த₂ம்,
       ஆயுர்வித்₃யாயஶோப₃லவ்ருத்₃த்₄யர்த₂ம், ஸர்வாரிஷ்டபரிஹாரத்₃வாரா
       ஸமஸ்தமங்க₃லாவாப்த்யர்த₂ம், விஶேஷத꞉ அஸ்மின் பா₄ரததே₃ஶே
       பரித்₃ருஶ்யமானபரஸ்பரவித்₃வேஷ–ஹிம்ஸா–நிந்தா₃தீ₃னாம்
       நிவ்ருத்தித்₃வாரா த₄ர்மஶ்ரத்₃தா₄லூனாம்
       ஸகலஶ்ரேயோ(அ)பி₄வ்ருத்₃த்₄யர்த₂ம், ஏதத்₃தே₃ஶராஜ்யபரிபாலகானாம்
       த₄ர்மே ஶ்ரத்₃தா₄பி₄வ்ருத்₃த்₄யர்த₂ம்,
       த₄னதா₄ன்யாதி₃ஸகலஸம்பத்ஸம்ருத்₃த்₄யர்த₂ம்
       ஶ்ரீது₃ர்கா₃ஸப்தஶ்லோகீபாராயணம் கரிஷ்யே ।`,
      
      `ஜ்ஞானிநாமபி சேதாம்ஸி தே₃வீ ப₄க₃வதீ ஹி ஸா ।
       ப₃லாதா₃க்ருஷ்ய மோஹாய மஹாமாயா ப்ரயச்ச₂தி ॥ 1 ॥`,

      `து₃ர்கே₃ ஸ்ம்ருதா ஹரஸி பீ₄திமஶேஷஜந்தோ꞉
       ஸ்வஸ்தை₂꞉ ஸ்ம்ருதா மதிமதீவ ஶுபா₄ம் த₃தா₃ஸி ।
       தா₃ரித்₃ரயது₃꞉க₂ப₄யஹாரிணி கா த்வத₃ன்யா
       ஸர்வோபகார-கரணாய ஸதா₃ர்த்₃ரசித்தா ॥ 2 ॥`,

      `ஸர்வமங்க₃லமாங்க₃ல்யே ஶிவே ஸர்வார்த₂ஸாதி₄கே ।
       ஶரண்யே த்ர்யம்ப₃கே கௌ₃ரி நாராயணி நமோ(அ)ஸ்து தே ॥ 3 ॥`,

      `ஶரணாக₃ததீ₃னார்தபரித்ராணபராயணே ।
       ஸர்வஸ்யார்திஹரே தே₃வி நாராயணி நமோ(அ)ஸ்து தே ॥ 4 ॥`,

      `ஸர்வஸ்வரூபே ஸர்வேஶே ஸர்வஶக்திஸமன்விதே ।
       ப₄யேப்₄யஸ்த்ராஹி நோ தே₃வி து₃ர்கே₃ தே₃வி நமோ(அ)ஸ்து தே ॥ 5 ॥`,

      `ரோகா₃னஶேஷான்அபஹம்ஸி துஷ்டா 
       ருஷ்டா து காமான் ஸகலானபீ₄ஷ்டான் ।
       த்வாமாஶ்ரிதானாம் ந விபன்னராணாம் 
       த்வாமாஶ்ரிதா ஹ்யாஶ்ரயதாம் ப்ரயாந்தி ॥ 6 ॥`,
       
      `ஸர்வாபா₃தா₄ப்ரஶமனம் த்ரைலோக்யஸ்யாகி₂லேஶ்வரி ।
       ஏவமேவ த்வயா கார்யமஸ்மத்₃வைரிவிநாஶனம் ॥ 7 ॥`,
    ];

    return (
      <div className="bg-[--gray-200]">
        <div className="container mx-auto px-6 py-8 flex flex-col gap-6 md:pb-20">
          <div className="max-w-[1175px] w-full mx-auto">
            <BreadCrumbs breadcrumbs={breadcrumbs} breadcrumbsSeperator={breadcrumbsSeperator} />
          </div>
          <section>
              <div className="max-w-[1175px] m-auto flex flex-col gap-4">
                <div className="page-main-inner-container flex gap-6 relative max-md:flex-col">
                  <Aside
                    isShlokasPage={'true'}
                    indexes={quickIndexes}
                    lang1={lang1}
                    lang2={lang2}
                    setLang1={setLang1}
                    setLang2={setLang2}
                    highlight={'var(--resources)'}
                  />
                  <div className="bg-white w-full flex flex-col gap-4 py-6 px-14 max-sm:px-6 overflow-hidden">
                    <h1 className="text-center font-normal font-pt-serif text-[37px] text-[#BA302A] max-sm:text-2xl -mt-4">
                      {firstHeading}
                    </h1>
                    <h1 className="text-center font-normal font-pt-serif text-[37px] text-[#BA302A] max-sm:text-2xl -mt-4">
                      {secondHeading}
                    </h1>
                    <hr />
                    {
                      audioPath && 
                      <iframe src={audioPath} title={firstHeading} scrolling="no" width="100%" height="400" frameBorder="0"></iframe>
                    }
                    <div className="mt-8 flex flex-col gap-12">
                      {
                        isLoading ? 
                        <Loader text='Shlokas' color='var(--resources)' /> :
                        <ul className='flex flex-col gap-6'>
                            {
                              shlokas?.map((shloka: Shloka, idx: number) => {
                                return (
                                  <li key={shloka?.id} className='flex flex-col gap-2 text-[13px] font-inter text-[var(--brown-dark)] font-medium'>
                                    {
                                      (selectedStotra.id == 'wGNFjMwZyn6qIV518AWy' && lang1 == 'tamil') ?
                                      <div style={{ whiteSpace: 'pre-line' }}>{tamilShlokas[idx]}</div> :
                                      <div style={{ whiteSpace: 'pre-line' }}>{transliterate(getInLang(shloka.title, 'en'), scheme, lang1)}</div>
                                    }
                                    {
                                      (selectedStotra.id == 'wGNFjMwZyn6qIV518AWy' && lang2 == 'tamil') ?
                                      <div style={{ whiteSpace: 'pre-line' }}>{tamilShlokas[idx]}</div> :
                                      <div style={{ whiteSpace: 'pre-line' }}>{lang2 != 'none' ? (transliterate(getInLang(shloka.title, 'en'), scheme, lang2)) : ""}</div>
                                    }
                                  </li>
                                ) 
                              })
                            }
                        </ul>
                      }
                    </div>
                  </div>
                </div>
              </div>
          </section>
        </div>
      </div>
    )
}

export default withStotras(PageContent)
