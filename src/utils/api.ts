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

export async function fetchSearchResults(searchTerm: string) {
  // Step 2.1: Encode the search term
  const encodedSearchTerm = encodeURIComponent(searchTerm.trim());

  // Step 2.2: Construct the API URL
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodedSearchTerm}&include_adult=false&language=en-US&page=1`;

  // Step 2.3: Perform the fetch
  const res = await fetch(url);

  // Step 2.4: Handle response errors
  if (!res.ok) {
    console.error('Fetch failed:', res.status, res.statusText);
    throw new Error('Failed to fetch search results');
  }

  // Step 2.5: Return the parsed JSON data
  return res.json();
}
