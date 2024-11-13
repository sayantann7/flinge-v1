"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { usePathname } from 'next/navigation'

const LoadingContext = createContext({ isLoading: true, setIsLoading: (loading: boolean) => {} })

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  // Set loading to false once the initial client-side hydration is complete
  useEffect(() => {
    setIsLoading(false)
  }, [])

  // Reset loading state on route changes
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in-0">
          <div className="flex items-center gap-2 bg-card p-4 rounded-lg shadow-lg">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-lg">Loading...</p>
          </div>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)