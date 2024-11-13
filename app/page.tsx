import { HeroSection } from "@/components/hero-section"
import { MovieRow } from "@/components/movie-row"
import { RecommendationDialog } from "@/components/recommendation-dialog"
import { getTrendingMovies, getPopularMovies, getImagePath } from "@/lib/tmdb"

export const revalidate = 0

export default async function Home() {
  const [trendingMovies, popularMovies] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
  ])

  const featuredMovie = trendingMovies[Math.floor(Math.random() * 5)]

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        movie={{
          id: featuredMovie.id.toString(),
          title: featuredMovie.title,
          overview: featuredMovie.overview,
          backdropPath: getImagePath(featuredMovie.backdrop_path, 'original'),
          rating: featuredMovie.vote_average,
        }}
      />
      
      <div className="container mx-auto py-6 sm:py-12">
        <div className="flex justify-center mb-8 sm:mb-12 px-4 sm:px-0">
          <RecommendationDialog />
        </div>

        <div className="space-y-8 sm:space-y-12">
          <MovieRow
            title="Trending Now"
            movies={trendingMovies.map(movie => ({
              id: movie.id.toString(),
              title: movie.title,
              posterPath: getImagePath(movie.poster_path),
              rating: movie.vote_average,
              year: movie.release_date.split('-')[0],
            }))}
          />
          
          <MovieRow
            title="Popular"
            movies={popularMovies.map(movie => ({
              id: movie.id.toString(),
              title: movie.title,
              posterPath: getImagePath(movie.poster_path),
              rating: movie.vote_average,
              year: movie.release_date.split('-')[0],
            }))}
          />
        </div>
      </div>
    </div>
  )
}