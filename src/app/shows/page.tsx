import Results from '@/components/Results';
import { fetchTrendingShows } from '@/utils/api';


export default async function ShowsPage() {
  const res = await fetchTrendingShows();
  const trendingShows = res.results;

  return (
    <main className='max-w-6xl mx-auto p-4'>
        <Results results={trendingShows} />
    </main>
  )
}
