import { fetchTopRatedMovies } from '@/utils/api';
import Results from '@/components/Results';

export default async function MoviesPage() {
  const res = await fetchTopRatedMovies();
  const trendingMovies = res.results;

  return (
    <main>
      <Results results={trendingMovies} />
    </main>
  )
}
