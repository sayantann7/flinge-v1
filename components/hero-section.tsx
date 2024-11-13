"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  movie: {
    id: string
    title: string
    overview: string
    backdropPath: string
    rating: number
  }
}

export function HeroSection({ movie }: HeroSectionProps) {
  return (
    <div className="relative h-[40vh] sm:h-[70vh] w-full overflow-hidden">
      <Image
        src={movie.backdropPath}
        alt={movie.title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 md:p-16">
        <div className="container mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4 max-w-2xl">
            {movie.title}
          </h1>
          <p className="text-sm sm:text-lg text-gray-200 mb-4 sm:mb-6 max-w-2xl line-clamp-2 sm:line-clamp-3">
            {movie.overview}
          </p>
          <div className="flex gap-4">
            <Link href={`/movie/${movie.id}`}>
              <Button size="sm" className="text-sm sm:text-base">
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}