import { fetchTopRatedMovies } from '@/utils/api';
import Results from '@/components/Results';
import MediaFilter from '@/components/MediaFilter';
//import { useEffect, useState } from 'react';

export default async function MoviesPage() {
  const res = await fetchTopRatedMovies();
  const trendingMovies = res.results;
/*   const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      // Your API call to fetch genres
      const response = await fetch('your-api-endpoint');
      const data = await response.json();
      setGenres(data.genres);
  };

  fetchGenres();
}, []); */

  return (
    <main>
      {/* <MediaFilter genres={genres} onFilterChange={(filters)} /> */}
      <MediaFilter />
      <Results results={trendingMovies} />
    </main>
  )
}
