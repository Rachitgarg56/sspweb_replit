'use client'
import { createContext, useState, useContext, ReactNode } from "react";

const LoadingContext = createContext<{
  isLoading: boolean;
  setLoading: (state: boolean) => void;
}>({
  isLoading: false,
  setLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom hook for easy usage
export const useLoading = () => useContext(LoadingContext);