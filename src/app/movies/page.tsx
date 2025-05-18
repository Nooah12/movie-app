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
      setMovies(res.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleFilterChange = useCallback(async (filters: MovieFilters) => {
    try {
      const res = await fetchFilteredMovies(filters);
      setMovies(res.results);
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