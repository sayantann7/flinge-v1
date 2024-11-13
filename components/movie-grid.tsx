import { MovieCard } from "@/components/movie-card"
import { getImagePath } from "@/lib/tmdb"

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
}

export function MovieGrid({ movies }: { movies: Movie[] }) {
  if (movies.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No movies found. Try a different search term.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id.toString()}
          title={movie.title}
          posterPath={getImagePath(movie.poster_path)}
          rating={movie.vote_average}
          year={movie.release_date?.split('-')[0] || ''}
        />
      ))}
    </div>
  )
}