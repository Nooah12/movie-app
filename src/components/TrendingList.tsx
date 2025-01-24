import { Type } from '@/utils/types';
import Image from "next/image";
import Link from 'next/link';

/* export async function TrendingShows ({title}: { title: string }) {
    const shows = await fetchTrendingShows();
    
    return (
        <section className="flex flex-col bg-slate-400 flex-grow p-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">
            {title}
          </h2>
          <ol className="space-y-4 max-w-2xl mx-auto">
            {shows.results.map((show: Type) => (
              <li key={show.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold">{show.name}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
    );
} */


// pages for pagination, later mby?
interface ApiResponse {
  results: Type[];
  page?: number;
  total_pages?: number;
  total_results?: number;
}

interface ListProps {
    listTitle: string;
    fetchData: () => Promise<ApiResponse>;
  }

export async function TrendingList ({ listTitle, fetchData }: ListProps) {
    const items = await fetchData();

    return (
/*         <section className="flex flex-col flex-grow p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">
          {listTitle}
        </h2>
        <ol className="max-w-2xl w-full mx-auto p-4 rounded-lg bg-white">
          {items.results.slice(0, 10).map((item: Type, index: number) => (
            <li key={item.id} className="py-0.5">
              <div className="flex items-center gap-4 bg-gray-100 text-black shadow-md rounded-lg px-2">
                <span className="text-sm w-4 text-center">{index +1}</span>
                <Image 
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                        alt={item.title || item.name || "poster"}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="min-w-10 h-auto"
                    />
                <p className="text-sm flex-1">{item.title || item.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm">
                    {item.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section> */


<section className="flex flex-col flex-grow p-4">
  <div className="max-w-lg w-full mx-auto bg-white/10 rounded-xl shadow-lg overflow-hidden border border-white/10">
    <h2 className="text-xl font-bold p-3 bg-black/40 text-white border-b border-white/10">
      {listTitle}
    </h2>
    <ol className="divide-y divide-gray-700/30">
      {items.results.slice(0, 10).map((item: Type, index: number) => (
        <li key={item.id}>
          <Link 
            href={`/${item.media_type}/${item.id}`} 
            className="flex items-center gap-3 p-2.5 hover:bg-white/5 transition-all duration-200 group relative"
          >
            <span className="text-sm font-medium w-5 text-gray-400 group-hover:text-white transition-colors">
              {index + 1}
            </span>
            <Image
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name || "poster"}
              width={32}
              height={48}
              sizes='100vh'
              className="rounded shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-200 group-hover:text-white truncate transition-colors duration-200">
                {item.title || item.name}
              </p>
            </div>
            <div className="flex items-center gap-1 text-gray-400 group-hover:text-yellow-400 transition-colors duration-200">
              <span className="text-xs">★</span>
              <span className="text-xs font-medium">
                {item.vote_average.toFixed(1)}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  </div>
</section>

    );
};