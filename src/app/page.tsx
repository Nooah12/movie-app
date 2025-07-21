import HeroSlider from '@/components/HeroSlider';
import { TrendingList } from '@/components/TrendingList';
import { fetchTrendingShows, fetchTrendingMovies } from '@/utils/api';

export default function Home() {
  return (
    <main className='flex-grow'>
      <HeroSlider />
      <section className='flex flex-col md:flex-row'>
        <TrendingList listTitle={'Trending Movies'} fetchData={fetchTrendingMovies} />
        <TrendingList listTitle={'Trending Shows'} fetchData={fetchTrendingShows} />
      </section>
    </main>
  )
}


