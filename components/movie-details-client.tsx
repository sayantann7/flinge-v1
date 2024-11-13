"use client"

import Image from "next/image"
import { Star, Clock, Calendar } from "lucide-react"
import { getImagePath } from "@/lib/tmdb"
import { MovieRow } from "@/components/movie-row"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useLoading } from "./loading-provider"

interface MovieDetails {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  release_date: string
  runtime: number
  genres: Array<{ id: number; name: string }>
  credits: {
    cast: Array<{
      id: number
      name: string
      character: string
      profile_path: string | null
    }>
  }
  similar: {
    results: Array<any>
  }
}

export function MovieDetailsClient({ movie }: { movie: MovieDetails }) {
  const { setIsLoading } = useLoading()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => {
      clearTimeout(timer)
      setIsLoading(true)
    }
  }, [setIsLoading, movie.id])

  if (!movie) {
    return <div>Movie not found</div>
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop - Hidden on Mobile */}
      <div className="relative hidden sm:block h-[70vh] w-full">
        <Image
          src={getImagePath(movie.backdrop_path, 'original')}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Movie Details */}
      <div className="container mx-auto sm:-mt-32 relative z-10">
        <div className="px-4 sm:px-0 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Poster */}
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl mt-4 sm:mt-0">
            <Image
              src={getImagePath(movie.poster_path)}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{movie.runtime} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Button key={genre.id} variant="secondary" size="sm">
                  {genre.name}
                </Button>
              ))}
            </div>

            <p className="text-base sm:text-lg leading-relaxed">{movie.overview}</p>

            {/* Cast */}
            <div className="mt-6 sm:mt-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Cast</h2>
              <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {movie.credits.cast.slice(0, 10).map((actor) => (
                  <div key={actor.id} className="flex-shrink-0 w-24 sm:w-32">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                      <Image
                        src={actor.profile_path 
                          ? getImagePath(actor.profile_path)
                          : 'https://via.placeholder.com/300x450'}
                        alt={actor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="font-medium text-sm sm:text-base line-clamp-1">{actor.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                      {actor.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {movie.similar.results.length > 0 && (
          <div className="mt-8 sm:mt-16">
            <MovieRow
              title="Similar Movies"
              movies={movie.similar.results.map((movie) => ({
                id: movie.id.toString(),
                title: movie.title,
                posterPath: getImagePath(movie.poster_path),
                rating: movie.vote_average,
                year: movie.release_date?.split('-')[0] || '',
              }))}
            />
          </div>
        )}
      </div>
    </div>
  )
}