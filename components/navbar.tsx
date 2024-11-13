"use client"

import { Film } from "lucide-react"
import Link from "next/link"
import { useLoading } from "./loading-provider"
import { SearchBar } from "./search-bar"

export function Navbar() {
  const { setIsLoading } = useLoading()

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link 
          href="/" 
          className="flex items-center gap-2 font-semibold text-lg"
          onClick={() => {
            setTimeout(() => setIsLoading(false), 0)
          }}
        >
          <Film className="h-6 w-6 text-primary" />
          <span className="text-primary">Flinge</span>
        </Link>
        
        <div className="ml-auto flex items-center">
          <SearchBar />
        </div>
      </div>
    </nav>
  )
}