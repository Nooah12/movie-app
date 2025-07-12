'use client'

import { fetchTopRatedMovies, fetchFilteredMovies, MovieFilters } from '@/utils/api';
import MediaFilter from '@/components/MediaFilter';
import Results from '@/components/Results';
import { useState, useEffect, useCallback } from 'react';
import { Type } from '@/utils/types';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Type[]>([]);

  const fetchMovies = useCallback(async () => {
    try {
      const res = await fetchTopRatedMovies();
      const moviesWithType = res.results.map((movie: Type) => ({
        ...movie,
        media_type: 'movie' as const
      }));
      setMovies(moviesWithType);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleFilterChange = useCallback(async (filters: MovieFilters) => {
    try {
      // If all filters are at default values, show top-rated instead of filtered
      const isDefaultFilters = (!filters.genres || filters.genres.length === 0) &&
                              (!filters.languages || filters.languages.length === 0) &&
                              (!filters.yearRange || (filters.yearRange[0] === 1920 && filters.yearRange[1] === new Date().getFullYear())) &&
                              (!filters.rating || filters.rating === 5);
      
      if (isDefaultFilters) {
        // Go back to top-rated movies
        const res = await fetchTopRatedMovies();
        const moviesWithType = res.results.map((movie: Type) => ({
          ...movie,
          media_type: 'movie' as const
        }));
        setMovies(moviesWithType);
      } else {
        // Apply filters
        const res = await fetchFilteredMovies(filters);
        const moviesWithType = res.results.map((movie: Type) => ({
          ...movie,
          media_type: 'movie' as const
        }));
        setMovies(moviesWithType);
      }
    } catch (error) {
      console.error('Error filtering movies:', error);
    }
  }, []);

  return (
    <main className='max-w-6xl mx-auto p-4 space-y-8'>
      <MediaFilter onFilterChange={handleFilterChange} />
      <Results results={movies} />
    </main>
  );
}