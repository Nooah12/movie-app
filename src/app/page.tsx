/* const API_KEY = process.env.API_KEY;

export default async function Home({searchParams}: { searchParams: {genre: string} }) {
  const genre = searchParams.genre || 'fetchTrending';
  const res = await fetch(
    `https://api.themoviedb.org/3${
      genre === "fetchTopRated" ? "/movie/top_rated" : "/trending/all/week"}?api_key=${API_KEY}&
      language=en-US&page=1`
  );
  const data = await res.json();
  if(!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const results = data.results;
  console.log(results);

  return (
    <main className="flex flex-col bg-slate-400 flex-grow">
      <h1>Home</h1>
    </main>
  );
}
 */





import { TrendingMovies } from '@/components/TrendingMovies';

export default function Home() {
  return (
    <main className='flex-grow'>
      <TrendingMovies title={'Trending Movies'} />
    </main>
  )
}




// useEffect
/* 'use client'
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '@/utils/api';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await fetchTrendingMovies();
        setTrendingMovies(movies.results);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex flex-col bg-slate-400 flex-grow">
      <h1 className='font-bold'>Trending Movies</h1>
      <ol>
        {trendingMovies.map((movie) => (
          <li key={movie.id}>
            <div>
              <p>{movie.title}</p>
              <p>{movie.original_language}</p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
};

export default HomePage; */



