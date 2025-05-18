'use client'
import MediaFilter from '@/components/MediaFilter';
import Results from '@/components/Results'; 
import { fetchFilteredShows, fetchTopRatedShows, MovieFilters } from '@/utils/api';
import { useState, useEffect, useCallback } from 'react';
import { Type } from '@/utils/types';


export default function ShowsPage() {
  const [shows, setShows] = useState<Type[]>([]);

  const fetchShows = useCallback(async () => {
    try {
      const res = await fetchTopRatedShows();
      setShows(res.results);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  }, []);

  useEffect( () => {
    fetchShows();
  }, [fetchShows])

  const handleFilterChange = useCallback(async (filters: MovieFilters) => {
    try {
      const res = await fetchFilteredShows(filters);
      setShows(res.results);
    } catch (error) {
      console.error('Error filtering shows', error);
    }
  }, []);

  return (
    <main className='max-w-6xl mx-auto p-4 space-y-8'>
        <MediaFilter onFilterChange={handleFilterChange} mediaType="tv" />
        <Results results={shows} /> 
    </main>
  )
}
