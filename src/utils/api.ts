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
    `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}language=en-US`,
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
  



/* export async function fetchTrendingMovies() {
    try {
      // Log to check if API key is available
      console.log('API Key available:', !!API_KEY); // Will log true/false without exposing the key
  
      const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
      console.log('Fetching from URL:', url);
  
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }
      });
  
      if (!res.ok) {
        // Log more details about the error
        console.error('Response status:', res.status);
        console.error('Response status text:', res.statusText);
        const errorText = await res.text();
        console.error('Error details:', errorText);
        throw new Error(`API call failed: ${res.status} ${res.statusText}`);
      }
  
      const data = await res.json();
      console.log('Data received:', !!data); // Will log true if data is received
      return data;
  
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  } */