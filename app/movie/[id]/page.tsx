import { getMovieDetails, getAllMovieIds } from "@/lib/tmdb"
import { MovieDetailsClient } from "@/components/movie-details-client"
import { Suspense } from "react"
import { MovieDetailsLoading } from "@/components/movie-details-loading"

// This function is required for static site generation
export async function generateStaticParams() {
  const movieIds = await getAllMovieIds();
  return movieIds.map((id) => ({
    id: id.toString(),
  }));
}

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(params.id);
  
  return (
    <Suspense fallback={<MovieDetailsLoading />}>
      <MovieDetailsClient movie={movie} />
    </Suspense>
  );
}