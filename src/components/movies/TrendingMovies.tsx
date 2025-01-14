import { MovieType } from '@/utils/types';
import { fetchTrendingMovies } from '@/utils/api';

export async function TrendingMovies({title}: {title: string}) {
  const movies = await fetchTrendingMovies();
  
  return (
    <section className="flex flex-col bg-slate-400 flex-grow p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">
        {title}
      </h2>
      <ol className="space-y-4 max-w-2xl mx-auto">
        {movies.results.map((movie: MovieType) => (
          <li key={movie.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">{movie.title}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}



 /*  <section className="flex flex-col bg-slate-400 flex-grow p-6">
      <h2 className="text-sm font-bold mb-6 text-center text-slate-800">
        {title}
      </h2>
      <ol className="space-y-4 max-w-2xl mx-auto">
        {items.results.map((item: MovieType) => (
          <li key={item.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-sm text-slate-600">{item.original_language}</p>
            </div>
          </li>
        ))}
      </ol>
    </section> */

    

/*     <section>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {items.results.map((item: MovieType) => (
          <div key={item.id} className="p-4 bg-white rounded shadow">
            <p className="text-sm font-semibold">{item.title}</p>
          </div>
        ))}
      </div>
    </section> 
  );
*/








