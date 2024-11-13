import { searchMovies } from "@/lib/tmdb"
import { MovieGrid } from "@/components/movie-grid"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q
  const movies = query ? await searchMovies(query) : []

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        {movies.length > 0 
          ? `Search results for "${query}"`
          : `No results found for "${query}"`}
      </h1>
      <MovieGrid movies={movies} />
    </div>
  )
}