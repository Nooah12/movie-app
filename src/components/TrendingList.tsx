import { Type } from '@/utils/types';
import Image from "next/image";

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
        <section className="flex flex-col bg-slate-400 flex-grow p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">
          {listTitle}
        </h2>
        <ol className="max-w-2xl w-full mx-auto p-4 rounded-lg bg-white">
          {items.results.slice(0, 10).map((item: Type, index: number) => (
            <li key={item.id} className="py-0.5">
              <div className="flex items-center gap-4 bg-gray-100 shadow-md rounded-lg px-2">
                <span className="text-sm w-4 text-center">{index +1}</span>
                <Image 
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                        alt={item.title || item.name || "Movie poster"}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="min-w-10 h-auto"
                    />
                <p className="text-sm flex-1">{item.title || item.name}</p>
                <p className="text-sm ml-auto">{item.vote_average.toFixed(1)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    );
};