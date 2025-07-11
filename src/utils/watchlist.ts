'use client'

import { createClient } from './supabase/client'
import { Type } from './types'

export interface WatchlistItem {
  id: string
  user_id: string
  movie_id: number
  movie_title: string
  poster_path: string | null
  media_type: string
  created_at: string
}

export async function addToWatchlist(item: Type) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')

  const { error } = await supabase
    .from('watchlist')
    .insert({
      user_id: user.id,
      movie_id: item.id,
      movie_title: item.title || item.name,
      poster_path: item.poster_path,
      media_type: item.media_type || 'movie'
    })

  if (error) throw error
}

export async function removeFromWatchlist(movieId: number, mediaType: string = 'movie') {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')

  const { error } = await supabase
    .from('watchlist')
    .delete()
    .eq('user_id', user.id)
    .eq('movie_id', movieId)
    .eq('media_type', mediaType)

  if (error) throw error
}

export async function getWatchlist(): Promise<WatchlistItem[]> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('watchlist')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function isInWatchlist(movieId: number, mediaType: string = 'movie'): Promise<boolean> {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data, error } = await supabase
    .from('watchlist')
    .select('id')
    .eq('user_id', user.id)
    .eq('movie_id', movieId)
    .eq('media_type', mediaType)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return !!data
}