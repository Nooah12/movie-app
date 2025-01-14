import { MovieType } from '@/utils/types';
import { fetchTrendingMovies, fetchTopRatedMovies } from '@/utils/api';

/* interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
} */

async function TrendingMovies() {
  const movies = await fetchTrendingMovies();
  
  return (
    <main className="flex flex-col bg-slate-400 flex-grow p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">
        Trending Movies
      </h1>
      <ol className="space-y-4 max-w-2xl mx-auto">
        {movies.results.map((movie: MovieType) => (
          <li key={movie.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="space-y-2">
              <p className="text-xl font-semibold">{movie.title}</p>
              <p className="text-sm text-slate-600">{movie.original_language}</p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}

export default TrendingMovies;






