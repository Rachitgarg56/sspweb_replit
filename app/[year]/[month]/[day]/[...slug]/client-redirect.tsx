"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { API_URL } from "@/config/api"

interface ClientRedirectProps {
  fullPath: string
}

export default function ClientRedirect({ fullPath }: ClientRedirectProps) {
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function handleRedirect() {
      try {
        const res = await fetch(`${API_URL}${fullPath}`)

        if (!res.ok) {
          console.error("API returned non-OK:", res.status)
          setError("Event not found")
          setIsRedirecting(false)
          return
        }

        const data = await res.json()
        const { slug: eventSlug } = data

        if (eventSlug) {
          router.push(`/events/${eventSlug}`)
        } else {
          setError("Event not found")
          setIsRedirecting(false)
        }
      } catch (error) {
        console.error("Redirect error:", error)
        setError("Failed to load event")
        setIsRedirecting(false)
      }
    }

    handleRedirect()
  }, [fullPath, router])

  if (error) {
    return (
        <div className="flex items-center justify-center min-h-[200px] gap-4">
            <span className="ml-3 text-gray-600 text-lg font-medium">Event not found</span>
            <button onClick={() => router.back()} className="px-4 py-2 bg-[var(--events)] text-white rounded hover:bg-[var(--events-hover)]">
                Go Back
            </button>
        </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[200px]">
        <div className={`animate-spin rounded-full h-12 w-12 border-t-4 border-opacity-75`} style={{ borderTopColor: 'var(--events-hover)' }} ></div>
        <span className="ml-3 text-gray-600 text-lg font-medium">Redirecting to event...</span>
    </div>
  )
}
