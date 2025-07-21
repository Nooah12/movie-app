import { Actor } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function fetchTrendingMovies() {
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

export async function fetchTopRatedMovies () {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
        { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch top rated movies');
    }

    return res.json();
};

export async function fetchTopRatedShows () {
  const res = await fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
      { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
      throw new Error('Failed to fetch top rated shows');
  }

  return res.json();
};
  
export async function fetchMovieDetails(movieId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch movie details');
  }
  
  return res.json();
}

export const fetchShowDetails = async (id: string) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`,
      { next: { revalidate: 3600 } }
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

export const fetchMovieCredits = async (movieId: string) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch movie credits: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};

export const fetchActorDetails = async (actorId: string): Promise<Actor> => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch actor: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching actor details:', error);
    throw error;
  }
};

export async function fetchSearchResults(searchTerm: string) {
  // Step 2.1: Encode the search term
  const encodedSearchTerm = encodeURIComponent(searchTerm.trim());

  // Step 2.2: Construct the API URL
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodedSearchTerm}&include_adult=false&language=en-US&page=1`;

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

export interface MovieFilters {
  genres?: number[];
  languages?: string[];
  yearRange?: [number, number];
  rating?: number;
}

export async function fetchFilteredMovies(filters?: MovieFilters) {
  const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
  
  const queryParams = [];
  
  if (filters?.genres?.length) {
    queryParams.push(`with_genres=${filters.genres.join(',')}`);
  }
  
  if (filters?.languages?.length) {
    queryParams.push(`with_original_language=${filters.languages.join(',')}`);
  }
  
  if (filters?.yearRange?.length === 2) {
    queryParams.push(`primary_release_date.gte=${filters.yearRange[0]}-01-01`);
    queryParams.push(`primary_release_date.lte=${filters.yearRange[1]}-12-31`);
  }
  
  if (filters?.rating) {
    queryParams.push(`vote_average.gte=${filters.rating}`);
  }

  const url = queryParams.length > 0 
    ? `${baseUrl}&${queryParams.join('&')}` 
    : baseUrl;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  
  if (!res.ok) {
    throw new Error('Failed to fetch filtered movies');
  }
  
  return res.json();
}

export async function fetchFilteredShows(filters?: MovieFilters) {
  const baseUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc`;
  
  const queryParams = [];
  
  if (filters?.genres?.length) {
    queryParams.push(`with_genres=${filters.genres.join(',')}`);
  }
  
  if (filters?.languages?.length) {
    queryParams.push(`with_original_language=${filters.languages.join(',')}`);
  }
  
  if (filters?.yearRange?.length === 2) {
    queryParams.push(`first_air_date.gte=${filters.yearRange[0]}-01-01`);
    queryParams.push(`first_air_date.lte=${filters.yearRange[1]}-12-31`);
  }
  
  if (filters?.rating) {
    queryParams.push(`vote_average.gte=${filters.rating}`);
  }

  const url = queryParams.length > 0 
    ? `${baseUrl}&${queryParams.join('&')}` 
    : baseUrl;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  
  if (!res.ok) {
    throw new Error('Failed to fetch filtered shows');
  }
  
  return res.json();
}