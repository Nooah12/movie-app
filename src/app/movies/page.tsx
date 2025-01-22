import { fetchTopRatedMovies } from '@/utils/api';
import Results from '@/components/Results';
import MediaFilter from '@/components/MediaFilter';

export default async function MoviesPage() {
  const res = await fetchTopRatedMovies();
  const trendingMovies = res.results;

  return (
    <main>
      <MediaFilter />
      <Results results={trendingMovies} />
    </main>
  )
}




/* 'use client'

import { useState } from "react";
import { fetchTopRatedMovies } from "@/utils/api";
import Results from "@/components/Results";
import MediaFilter from "@/components/MediaFilter";

export default function MoviesPage() {
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleFilterChange = async (filters: {
    genres: string[];
    languages: string[];
    yearRange: number[];
    rating: number;
  }) => {
    try {
      // Fetch filtered movies using your filters
      const res = await fetchTopRatedMovies(filters); // Update your API logic to accept filters
      setFilteredMovies(res.results);
    } catch (error) {
      console.error("Failed to fetch filtered movies:", error);
    }
  };

  return (
    <main>
      <MediaFilter onFilterChange={handleFilterChange} />
      <Results results={filteredMovies} />
    </main>
  );
}
 */







/* 'use client';

import { useState, useEffect } from 'react';
import { fetchTopRatedMovies } from '@/utils/api';
import Results from '@/components/Results';
import MediaFilter from '@/components/MediaFilter';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]); // All movies fetched from the API
  const [filteredMovies, setFilteredMovies] = useState([]); // Filtered list
  const [filters, setFilters] = useState({ genres: [], languages: [] }); // Selected filters

  // Fetch movies on mount
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetchTopRatedMovies();
      setMovies(res.results);
      setFilteredMovies(res.results); // Initially, all movies are shown
    };
    fetchMovies();
  }, []);

  // Update filtered movies when filters change
  useEffect(() => {
    const applyFilters = () => {
      const filtered = movies.filter((movie: any) => {
        const matchesGenre = filters.genres.length
          ? filters.genres.some((genre) => movie.genre_ids.includes(genre))
          : true;
        const matchesLanguage = filters.languages.length
          ? filters.languages.includes(movie.original_language)
          : true;

        return matchesGenre && matchesLanguage;
      });

      setFilteredMovies(filtered);
    };

    applyFilters();
  }, [filters, movies]);

  // Handle filter changes from MediaFilter
  const handleFilterChange = ({ type, value }: { type: 'genre' | 'language'; value: string }) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (type === 'genre') {
        updated.genres = prev.genres.includes(value)
          ? prev.genres.filter((g) => g !== value)
          : [...prev.genres, value];
      } else if (type === 'language') {
        updated.languages = prev.languages.includes(value)
          ? prev.languages.filter((l) => l !== value)
          : [...prev.languages, value];
      }
      return updated;
    });
  };

  return (
    <main>
      <MediaFilter onFilterChange={handleFilterChange} />
      <Results results={filteredMovies} />
    </main>
  );
}
 */