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

/* export const fetchTopRatedMovies = async (filters: {
  genres?: string[];
  languages?: string[];
  yearRange?: number[];
  rating?: number;
}) => {
  const genreQuery = filters.genres?.length ? `&with_genres=${filters.genres.join(",")}` : "";
  const languageQuery = filters.languages?.length ? `&with_original_language=${filters.languages.join(",")}` : "";
  const yearRangeQuery =
    filters.yearRange?.length === 2 ? `&primary_release_date.gte=${filters.yearRange[0]}-01-01&primary_release_date.lte=${filters.yearRange[1]}-12-31` : "";
  const ratingQuery = filters.rating ? `&vote_average.gte=${filters.rating}` : "";

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&sort_by=popularity.desc${genreQuery}${languageQuery}${yearRangeQuery}${ratingQuery}`
  );
  return response.json();
}; */





  
export async function fetchMovieDetails(movieId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch movie details');
  }

  return res.json();
}

// Add error handling to your API call
export const fetchShowDetails = async (id: string) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch show: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching show details:', error);
    throw error;
  }
};


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
