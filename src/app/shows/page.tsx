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
      const showsWithType = res.results.map((show: Type) => ({
        ...show,
        media_type: 'tv' as const
      }));
      setShows(showsWithType);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  }, []);

  useEffect( () => {
    fetchShows();
  }, [fetchShows])

  const handleFilterChange = useCallback(async (filters: MovieFilters) => {
    try {
      // If all filters are at default values, show top-rated instead of filtered
      const isDefaultFilters = (!filters.genres || filters.genres.length === 0) &&
                              (!filters.languages || filters.languages.length === 0) &&
                              (!filters.yearRange || (filters.yearRange[0] === 1920 && filters.yearRange[1] === new Date().getFullYear())) &&
                              (!filters.rating || filters.rating === 5);
      
      if (isDefaultFilters) {
        // Go back to top-rated shows
        const res = await fetchTopRatedShows();
        const showsWithType = res.results.map((show: Type) => ({
          ...show,
          media_type: 'tv' as const
        }));
        setShows(showsWithType);
      } else {
        // Apply filters
        const res = await fetchFilteredShows(filters);
        const showsWithType = res.results.map((show: Type) => ({
          ...show,
          media_type: 'tv' as const
        }));
        setShows(showsWithType);
      }
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
