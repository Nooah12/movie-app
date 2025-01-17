//import { TrendingMovies } from '@/components/movies/TrendingMovies';

import Hero from '@/components/hero/Hero';
import { TrendingList } from '@/components/TrendingList';
import { fetchTrendingShows, fetchTrendingMovies } from '@/utils/api';

export default function Home() {
  return (
    <main className='flex-grow'>
      <Hero />
      {/* <TrendingMovies title={'Trending Movies'} /> */}
      <TrendingList listTitle={'Trending Movies'} fetchData={fetchTrendingMovies} />
      <TrendingList listTitle={'Trending Shows'} fetchData={fetchTrendingShows} />
    </main>
  )
}


