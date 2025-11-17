import React from 'react'

interface LoaderProps {
    text: string;
    color: string;
}

const Loader = ( { text, color }: LoaderProps ) => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
        <div className={`animate-spin rounded-full h-12 w-12 border-t-4 border-opacity-75`} style={{ borderTopColor: color }} ></div>
        <span className="ml-3 text-gray-600 text-lg font-medium">Loading {text}...</span>
    </div>
  )
}

export default Loader