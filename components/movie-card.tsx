"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { useLoading } from "./loading-provider"

interface MovieCardProps {
  id: string
  title: string
  posterPath: string
  rating: number
  year: string
  className?: string
}

export function MovieCard({ id, title, posterPath, rating, year, className }: MovieCardProps) {
  const router = useRouter()
  const { setIsLoading } = useLoading()

  const handleClick = () => {
    setIsLoading(true) // Show loading immediately
    router.push(`/movie/${id}`)
  }

  return (
    <button onClick={handleClick} className="w-full text-left">
      <Card className={cn(
        "group relative overflow-hidden transition-all hover:scale-105",
        "w-full sm:w-[200px] rounded-lg border-0 bg-transparent",
        className
      )}>
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
            <Image
              src={posterPath}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 200px"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <h3 className="text-white font-semibold line-clamp-2">{title}</h3>
              <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
                <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                <span>{rating.toFixed(1)}</span>
                <span className="ml-auto">{year}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  )
}