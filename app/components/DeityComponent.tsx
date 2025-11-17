import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Deity, DeityTitle } from '../src/types'
import Link from 'next/link';
import { transliterate } from '@/utils/helpers';

// Define types for the props

interface DeityComponentProps {
  index?: string;
  deity: Deity;
  lang1: string;
  lang2: string;
  isSingleDeity?: boolean;
  updateFocusedDeity?: (index: number) => void;
}

const DeityComponent = forwardRef<HTMLDivElement, DeityComponentProps>((props, ref) => {
  const { isSingleDeity = false, index, deity, lang1, lang2, updateFocusedDeity } = props;
  const deityRef = useRef(null);

  // Utility function to get the title in the specified language
  const getInLang = (_arr: DeityTitle[], _lang: string): string => {
    return _arr.find(a => a.lang === _lang)?.value ?? '';
  };

  // Get the titles and stotras only once
  const titleIAST = getInLang(deity.title, 'en');
  const scheme = 'iast';
  const l1Title = transliterate(titleIAST, scheme, lang1) || "";
  const l2Title = lang2 != 'none' ? (transliterate(titleIAST, scheme, lang2) || "") : "" ;



  const stotrasArr = deity.stotras.map(stotra => {
    const stotraTitleIAST = stotra.title.find(t => t.lang == 'en').value;
    return [
      transliterate(stotraTitleIAST, scheme, lang1) || "",
      lang2 != 'none' ? (transliterate(stotraTitleIAST, scheme, lang2) || "") : ""
    ]
  });
  // console.log(stotrasArr);

  useEffect(() => {
    if (isSingleDeity) return;
    function getDistanceFromTop() {
      const topDist = deityRef?.current?.getBoundingClientRect().top;
      if (topDist < 100) {
        updateFocusedDeity(parseInt(index,10));
      }
    }

    window.addEventListener('scroll', getDistanceFromTop);

    return () => window.removeEventListener('scroll', getDistanceFromTop);
  },[])

  return (
    <div ref={deityRef} id={`deity-${index}`} className="text-[#BA302A] flex flex-col gap-4">
      {
        isSingleDeity 
        ? 
        <h2 className="font-medium text-[19px]">
            {l1Title} <i>{l2Title}</i>
        </h2>
        :
        <Link href={`/stotras/${deity.url}`}>
          <h2 className="font-medium text-[19px]">
            {l1Title} <i>{l2Title}</i>
          </h2>
        </Link>
      }
      <ol className="list-decimal text-[13px] font-inter font-medium flex flex-col gap-4 ml-8 text-sm">
        {stotrasArr.map((stotras, idx) => (
          <li key={idx} className='cursor-pointer'>
            <Link href={`/stotras/${deity?.url}/${deity?.stotras[idx]?.url}`}>
              <p>{stotras[0]}</p>
              <p>{stotras[1]}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
});

DeityComponent.displayName = 'DeityComponent';
export default DeityComponent;