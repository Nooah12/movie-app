import { fetchTopRatedMovies } from '@/utils/api';
import MediaFilter from '@/components/MediaFilter';
import Results from '@/components/Results';

export default async function MoviesPage() {
  const res = await fetchTopRatedMovies();
  const trendingMovies = res.results;

  return (
    <main className='max-w-6xl mx-auto p-4'>
      <MediaFilter />
      <Results results={trendingMovies} />
    </main>
  )
}