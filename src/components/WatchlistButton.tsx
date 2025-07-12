'use client'

import { useState, useEffect } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from '@/utils/watchlist'
import { Type } from '@/utils/types'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

interface WatchlistButtonProps {
  item: Type
  className?: string
  onUpdate?: () => void
}

export default function WatchlistButton({ item, className = '', onUpdate }: WatchlistButtonProps) {
  const [isInList, setIsInList] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      
      if (user) {
        const inList = await isInWatchlist(item.id, item.media_type || 'movie')
        setIsInList(inList)
      }
    }
    
    checkAuth()
  }, [item.id, item.media_type, supabase])

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      // Redirect to sign in
      window.location.href = '/auth/sign-in'
      return
    }

    setIsLoading(true)
    try {
      if (isInList) {
        await removeFromWatchlist(item.id, item.media_type || 'movie')
        setIsInList(false)
      } else {
        await addToWatchlist(item)
        setIsInList(true)
      }
      onUpdate?.()
    } catch (error) {
      console.error('Error toggling watchlist:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <button
        onClick={handleToggle}
        className={`p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors ${className}`}
        title="Sign in to add to watchlist"
      >
        <AiOutlineHeart className="w-5 h-5 text-white" />
      </button>
    )
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors ${className}`}
      title={isInList ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : isInList ? (
        <AiFillHeart className="w-5 h-5 text-red-500" />
      ) : (
        <AiOutlineHeart className="w-5 h-5 text-white" />
      )}
    </button>
  )
}