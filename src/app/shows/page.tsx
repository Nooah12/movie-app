import { fetchTrendingShows } from '@/utils/api';
import Results from '@/components/Results';

export default async function ShowsPage() {
  const res = await fetchTrendingShows();
  const trendingShows = res.results;

  return (
    <main>
        <Results results={trendingShows} />
    </main>
  )
}
