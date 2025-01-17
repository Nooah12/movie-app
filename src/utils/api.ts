//import { Type } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function fetchTrendingMovies() {
    if (!API_KEY) {
    throw new Error('API_KEY is not defined')
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch trending movies')
  }

  return res.json()
}

export async function fetchTrendingShows() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch trending shows')
  }

  return res.json()
}

export const fetchTopRatedMovies = async () => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!res.ok) {
        throw new Error('Failed to fetch top rated movies');
    }

    return res.json();
};
  
export async function fetchMovieDetails(movieId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch movie details');
  }

  return res.json();
}

export async function fetchMovies(searchTerm: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  return res.json();
}
