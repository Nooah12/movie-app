'use client'
import { fetchSearchResults } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import { Search } from 'lucide-react'
import Image from "next/image"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Type } from "@/utils/types"

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

/*   const { data } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: async () => {
      if (!searchTerm || searchTerm.length < 3) return { results: [] };
      return fetchSearchResults(searchTerm); // Call the function created earlier
    },
    enabled: searchTerm.length >= 3, // Prevent queries for short terms
  }); */


  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce the searchTerm
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer); // Cleanup timer
  }, [searchTerm]);

  const { data } = useQuery({
    queryKey: ['search', debouncedSearchTerm],
    queryFn: async () => {
      if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) return { results: [] };
      return fetchSearchResults(debouncedSearchTerm);
    },
    enabled: debouncedSearchTerm.length >= 2, // Only query if term is valid
  });


  // Render the search bar
  return (
    <div className='relative w-full max-w-lg'>
      <div className='flex relative w-full items-center gap-2 rounded-full bg-white px-4 py-2 text-zinc-400'>
        <label htmlFor='search'>
          <Search size={20} />
        </label>
        <input
          id='search'
          type='text'
          value={searchTerm}
          placeholder='Search movies, shows, actors...'
          className='w-full text-zinc-800 outline-none'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {data?.results && (
          <div className={searchResultClasses}>
            {data.results.map((result: Type) => (
              <Link
                key={result.id}
                href={
                  result.media_type === 'movie'
                    ? `/movies/${result.id}`
                    : result.media_type === 'tv'
                    ? `/shows/${result.id}`
                    : `/person/${result.id}`
                }
                className={searchResultItemClasses}
              >
                <div className="flex items-center gap-4">
                  {result.poster_path || result.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w92${result.poster_path || result.profile_path}`}
                      alt={result.title || result.name || 'poster'}
                      className="w-12 h-16 object-cover rounded-md"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      N/A
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-sm">
                      {result.title || result.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {result.media_type} •{' '}
                      {result.release_date || result.first_air_date}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {data?.results?.length === 0 && searchTerm.length >= 2 && (
          <div className={searchResultClasses}>
            <div className="ml-4">No results found</div>
          </div>
        )}
      </div>
    </div>
  );
};

const searchResultClasses =
  'absolute top-[calc(100%+.5rem)] flex w-full flex-col gap-2 rounded-2xl bg-white py-4 shadow-md';
const searchResultItemClasses = 'w-full px-4 py-2 hover:bg-slate-50';