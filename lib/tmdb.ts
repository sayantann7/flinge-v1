const TMDB_API_KEY = '320967d24238b70ff8b5976ad50afb0c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export async function getTrendingMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  return data.results;
}

export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
  );
  const data = await response.json();
  return data.results;
}

export async function getMovieDetails(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,similar`
  );
  const data = await response.json();
  return data;
}

export async function searchMovies(query: string) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results;
}

export async function getAllMovieIds() {
  const [trending, popular] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
  ]);

  const movieIds = new Set([
    ...trending.map((movie: any) => movie.id.toString()),
    ...popular.map((movie: any) => movie.id.toString()),
  ]);

  return Array.from(movieIds);
}

export function getImagePath(path: string, size: 'w500' | 'original' = 'w500') {
  if (!path) return 'https://via.placeholder.com/500x750';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}