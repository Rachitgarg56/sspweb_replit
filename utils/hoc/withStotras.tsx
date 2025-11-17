import { useLoading } from '@/context/LoadingProvider';
import React, { useState, useEffect } from 'react';

interface Props {
  isLoading: boolean;
  setLoading?: (isLoading: boolean) => void;
  lang1: string;
  lang2: string;
  setLang1: (lang1: string) => void;
  setLang2: (lang2: string) => void;
}

const withStotras = (OldComponent: React.FC<Props>) => {
  const NewComponent = (props) => {
    const { isLoading, setLoading } = useLoading();
    const [lang1, setLang1State] = useState<string>("devanagari");
    const [lang2, setLang2State] = useState<string>("iast");

    // Load from localStorage on mount
    useEffect(() => {
      const storedLang1 = localStorage.getItem("selectedLangFirst");
      const storedLang2 = localStorage.getItem("selectedLangSecond");

      if (storedLang1) setLang1State(storedLang1);
      if (storedLang2) setLang2State(storedLang2);
    }, []);

    // Save to localStorage when lang1 or lang2 changes
    const setLang1 = (value: string) => {
      localStorage.setItem("selectedLangFirst", value);
      setLang1State(value);
    };

    const setLang2 = (value: string) => {
      localStorage.setItem("selectedLangSecond", value);
      setLang2State(value);
    };

    return (
      <OldComponent
        {...props}
        isLoading={isLoading}
        setLoading={setLoading}
        lang1={lang1}
        lang2={lang2}
        setLang1={setLang1}
        setLang2={setLang2}
      />
    );
  };

  return NewComponent;
};

export default withStotras;
