import { fetchTrendingMovies, fetchTrendingShows } from "@/utils/api";
import { Type } from '@/utils/types';

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



interface ListProps {
    title: string;
    //items: any[];
    fetchData: () => Promise<any>;
  }

export async function TrendingShows ({ title, fetchData }: ListProps) {
    const items = await fetchData();
    return (
        <section className="flex flex-col bg-slate-400 flex-grow p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">
          {title}
        </h2>
        <ol className="space-y-4 max-w-2xl mx-auto">
          {items.results.map((item: Type) => (
            <li key={item.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="space-y-2">
              <p className="font-semibold">{item.title || item.name}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    );
};