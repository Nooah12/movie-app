'use client'

import { useState, useEffect } from 'react'
import { getWatchlist, WatchlistItem } from '@/utils/watchlist'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import Link from 'next/link'
/* import { AiFillStar } from 'react-icons/ai' */
import WatchlistButton from '@/components/WatchlistButton'
import { Type } from '@/utils/types'
import { User } from '@supabase/supabase-js'

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const checkAuthAndFetchWatchlist = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        try {
          const items = await getWatchlist()
          setWatchlist(items)
        } catch (error) {
          console.error('Error fetching watchlist:', error)
        }
      }
      setLoading(false)
    }

    checkAuthAndFetchWatchlist()
  }, [supabase])

  const handleWatchlistUpdate = async () => {
    // Refresh watchlist after item removal
    try {
      const items = await getWatchlist()
      setWatchlist(items)
    } catch (error) {
      console.error('Error refreshing watchlist:', error)
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center py-12">
          <h1 className="text-3xl mb-4">My Watchlist</h1>
          <p className="text-gray-400 mb-6">Sign in to create your personal watchlist</p>
          <Link 
            href="/auth/sign-in"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4 flex-grow">
      <h1 className="text-3xl mb-8">My Watchlist</h1>
      
      {watchlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-6">Your watchlist is empty</p>
          <p className="text-sm text-gray-500">Browse movies and shows to add them to your watchlist</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
          {watchlist.map((item) => {
            // Convert WatchlistItem to Type for compatibility
            const movieItem: Type = {
              id: item.tmdb_id,
              title: item.title,
              name: item.title,
              poster_path: item.poster_path,
              media_type: item.media_type as 'movie' | 'tv' | 'person',
              // Add other required fields with defaults
              original_title: item.title,
              original_name: item.title,
              original_language: '',
              overview: '',
              backdrop_path: null,
              release_date: '',
              first_air_date: '',
              vote_average: 0,
              vote_count: 0,
              popularity: 0,
              adult: false,
              video: false,
              genre_ids: [],
              origin_country: [],
              profile_path: '',
              runtime: 0,
            }

            return (
              <div key={item.id} className="cursor-pointer mb-4">
                <Link href={
                  item.media_type === 'tv' ? 
                  `/shows/${item.tmdb_id}` :
                  `/movies/${item.tmdb_id}`
                }>
                  <div className="group hover:shadow-slate-400 shadow-md rounded-md border-slate-400 m-2 transition-shadow duration-200">
                    <div className="aspect-[2/3] relative">
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                        alt={item.title}
                        fill
                        className="rounded-md w-full h-auto object-cover group-hover:opacity-75 transition-opacity duration-300"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <WatchlistButton 
                          item={movieItem} 
                          onUpdate={handleWatchlistUpdate}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0 px-2">
                    <h2 className="text-sm font-medium truncate mb-4">
                      {item.title}
                    </h2>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
