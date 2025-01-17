'use client'
import { fetchMovies } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import { Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface MovieResult {
  id: number;
  title: string;
}

export const SearchBar = () => {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState('')
  
  const { data } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: async () => {
      if (!searchTerm || searchTerm.length < 3) return { results: [] };
      
      const data = await fetchMovies(searchTerm);
      return data;
    },
    enabled: searchTerm.length >= 3
  })

  useEffect(() => {
    setSearchTerm('')
  }, [pathname])

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
          placeholder='search...'
          className='w-full text-zinc-800 outline-none'
          onChange={(event) => {
            setSearchTerm(event.target.value)
          }}
        />
        {data?.results && data.results.length > 0 && (
          <div className={searchResultClasses}>
            {data.results.map((movie: MovieResult) => (
              <Link 
                key={movie.id} 
                href={`/movies/${movie.id}`} 
                className={searchResultItemClasses}
              >
                {movie.title}
              </Link>
            ))}
          </div>
        )}
        {data?.results && data.results.length === 0 && searchTerm.length >= 3 && (
          <div className={searchResultClasses}>
            <div className='ml-4'>No movies found</div>
          </div>
        )}
      </div>
    </div>
  )
}

const searchResultClasses =
  'absolute top-[calc(100%+.5rem)] flex w-full flex-col gap-2 rounded-2xl bg-white py-4 shadow-md'
const searchResultItemClasses = 'w-full px-4 py-2 hover:bg-slate-50'
