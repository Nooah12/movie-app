import { Type } from '@/utils/types';
import { fetchTrendingShows } from '@/utils/api';
import Card from '@/components/Card';

export default async function ShowsPage() {
  const response = await fetchTrendingShows();
  const trendingShows = response.results;

  return (
    <main>
      <div>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 max-w-6xl mx-auto py-4'>
          {trendingShows.map((result: Type) => (
            <Card key={result.id} result={result} />
          ))}
        </div>
      </div>
    </main>
  )
}
