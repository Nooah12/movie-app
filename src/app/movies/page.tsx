'use client'

import { fetchTopRatedMovies, fetchFilteredMovies, MovieFilters } from '@/utils/api';
import MediaFilter from '@/components/MediaFilter';
import Results from '@/components/Results';
import { useState, useEffect, useCallback } from 'react';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = useCallback(async () => {
    try {
      const res = await fetchTopRatedMovies();
      setMovies(res.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleFilterChange = useCallback(async (filters: MovieFilters) => {
    setIsLoading(true);
    try {
      const res = await fetchFilteredMovies(filters);
      setMovies(res.results);
    } catch (error) {
      console.error('Error filtering movies:', error);
    }
    setIsLoading(false);
  }, []);

  return (
    <main className='max-w-6xl mx-auto p-4 space-y-8'>
      <MediaFilter onFilterChange={handleFilterChange} />
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <Results results={movies} />
      )}
    </main>
  );
}