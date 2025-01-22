//import { TrendingMovies } from '@/components/movies/TrendingMovies';

//import Hero from '@/components/hero/Hero';
import HeroSlider from '@/components/HeroSlider';
import { TrendingList } from '@/components/TrendingList';
import { fetchTrendingShows, fetchTrendingMovies } from '@/utils/api';

export default function Home() {
  return (
    <main className='flex-grow'>
      <HeroSlider />
      {/* <Hero /> */}
      {/* <TrendingMovies title={'Trending Movies'} /> */}
      <TrendingList listTitle={'Trending Movies'} fetchData={fetchTrendingMovies} />
      <TrendingList listTitle={'Trending Shows'} fetchData={fetchTrendingShows} />
    </main>
  )
}


