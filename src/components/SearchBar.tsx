'use client'
import { fetchSearchResults } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import { Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Type } from "@/utils/types"


export const SearchBar = () => {
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  //const [showSearch, setShowSearch] = useState(false)
  
  const { data } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: async () => {
      if (!searchTerm || searchTerm.length < 2) return { results: [] };
      
      const data = await fetchSearchResults(searchTerm);
      return data;
    },
    enabled: searchTerm.length >= 2
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target || !(event.target as HTMLElement).closest('#search-bar')) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSearchTerm('')
    setIsOpen(false)
   // setShowSearch(false)
  }, [pathname]) 

  return (
    <div id="search-bar" className='relative w-full max-w-md'>
      <div className='flex relative w-full items-center gap-4 rounded-full bg-white px-4 py-2 text-zinc-400'>
        <label htmlFor='search'>
          <Search size={20} />
        </label>
        <input
          id='search'
          type='text'
          value={searchTerm}
          placeholder='search...'
          className='w-full text-zinc-800 outline-none'
          onChange={(event) => setSearchTerm(event.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
        {isOpen && data?.results && (
          <div className={searchResultClasses}>
            {data.results.slice(0, 5).map((result: Type) => (
              <Link
                key={result.id}
                href={
                  result.media_type === 'movie'
                    ? `/movies/${result.id}`
                    : result.media_type === 'tv'
                    ? `/shows/${result.id}`
                    : `/actors/${result.id}`
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
                  <div className="flex flex-col gap-2 min-w-0">
                    <h3 className="font-semibold text-sm truncate">
                      {result.title || result.name}
                    </h3>
                    <div className="text-xs font-extralight text-gray-500 capitalize flex gap-3">
                      <span>{(result.release_date || result.first_air_date)?.slice(0, 4)}</span> <span>•</span>
                      <span>{result.media_type}</span>
                      </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {data?.results && data.results.length === 0 && searchTerm.length >= 2 && (
          <div className={searchResultClasses}>
            <div className='ml-4'>No results found</div>
          </div>
        )}
      </div>
    </div>
  )
}


const searchResultClasses = `
  absolute 
  top-[calc(100%+4px)]
  left-0 
  right-0 
  flex 
  flex-col 
  gap-2 
  bg-white 
  py-4 
  shadow-md
  rounded-2xl
  z-50
`
const searchResultItemClasses = 'w-full px-4 py-2 hover:bg-slate-50'