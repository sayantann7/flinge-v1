"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"

interface Movie {
  id: string
  title: string
  posterPath: string
  rating: number
  year: string
}

interface MovieRowProps {
  title: string
  movies: Movie[]
}

export function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth"
      })
    }
  }

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current
      setShowLeftButton(scrollLeft > 0)
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  return (
    <div className="relative px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">{title}</h2>
      
      <div className="relative group">
        {showLeftButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}
        
        <div
          ref={rowRef}
          className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          onScroll={handleScroll}
        >
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              {...movie} 
              className="w-[120px] sm:w-[200px]"
            />
          ))}
        </div>
        
        {showRightButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  )
}