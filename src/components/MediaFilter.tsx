'use client'

import { useState, useEffect, useCallback } from "react";
import { FiChevronDown } from "react-icons/fi";
import dynamic from 'next/dynamic';
import { GenreType } from "@/utils/types";
import type { MovieFilters } from "@/utils/api";

const Slider = dynamic(() => import('rc-slider'), {
  ssr: false,
});
import "rc-slider/assets/index.css";

interface MediaFilterProps {
  onFilterChange?: (filters: MovieFilters) => void;
  mediaType?: 'movie' | 'tv';
}

const MediaFilter = ({ onFilterChange, mediaType = 'movie' }: MediaFilterProps) => {
  const currentYear = new Date().getFullYear();
  const [genres, setGenres] = useState<number[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([1920, currentYear]);
  const [rating, setRating] = useState<number>(5);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Memoize the current filter state
  const currentFilters = useCallback(() => ({
    genres,
    languages,
    yearRange,
    rating
  }), [genres, languages, yearRange, rating]);

  // Debounced filter change handler
  useEffect(() => {
    if (!onFilterChange) return;

    const timeoutId = setTimeout(() => {
      onFilterChange(currentFilters());
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [currentFilters, onFilterChange]);

  const handleGenreSelect = (genreId: number) => {
    setGenres(prev =>
      prev.includes(genreId) ? prev.filter(g => g !== genreId) : [...prev, genreId]
    );
  };

  const handleLanguageSelect = (language: string) => {
    setLanguages(prev =>
      prev.includes(language) ? prev.filter(l => l !== language) : [...prev, language]
    );
  };

  const clearGenres = () => setGenres([]);
  const clearLanguages = () => setLanguages([]);
  const clearAll = () => {
    clearGenres();
    clearLanguages();
    setYearRange([1920, currentYear]);
    setRating(5);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-container")) {
        setIsGenreOpen(false);
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const movieGenres: GenreType[] = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
  ];

  const tvGenres: GenreType[] = [
    { id: 10759, name: "Action & Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 10762, name: "Kids" },
    { id: 9648, name: "Mystery" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" }
  ];

  const genresList = mediaType === 'tv' ? tvGenres : movieGenres;

  const languagesList = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" }
  ];

  // Clear genres when mediaType changes to prevent invalid genre selections
  useEffect(() => {
    clearGenres();
  }, [mediaType]);

  return (
    <div className="bg-white/10 p-4 rounded-lg shadow-md">
      <div className="max-w-7xl mx-auto rounded-lg shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2 space-y-4">
            <div className="dropdown-container relative">
              <label className="block text-sm font-medium text-gray-100 mb-2">
                Genres {genres.length > 0 && `(${genres.length})`}
              </label>
              <div
                className="flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
                onClick={() => setIsGenreOpen(!isGenreOpen)}
              >
                <span className="text-sm text-gray-600">
                  {genres.length ? `${genres.length} selected` : "Select genres"}
                </span>
                <FiChevronDown className={`transition-transform ${isGenreOpen ? "rotate-180" : ""}`} />
              </div>
              {isGenreOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="p-2 max-h-60 overflow-y-auto">
                    {genresList.map((genre) => (
                      <label key={genre.id} className="flex items-center p-2 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={genres.includes(genre.id)}
                          onChange={() => handleGenreSelect(genre.id)}
                          className="mr-2"
                        />
                        <span className="text-gray-700">{genre.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="dropdown-container relative">
              <label className="block text-sm font-medium text-gray-100 mb-2">
                Languages {languages.length > 0 && `(${languages.length})`}
              </label>
              <div
                className="flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <span className="text-sm text-gray-600">
                  {languages.length ? `${languages.length} selected` : "Select languages"}
                </span>
                <FiChevronDown className={`transition-transform ${isLanguageOpen ? "rotate-180" : ""}`} />
              </div>
              {isLanguageOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="p-2">
                    {languagesList.map((language) => (
                      <label key={language.code} className="flex items-center p-2 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={languages.includes(language.code)}
                          onChange={() => handleLanguageSelect(language.code)}
                          className="mr-2"
                        />
                        <span className="text-gray-700">{language.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                Year Range: {yearRange[0]} - {yearRange[1]}
              </label>
              <div className="px-2">
                <Slider
                  range
                  min={1920}
                  max={currentYear}
                  value={yearRange}
                  onChange={(value) => setYearRange(value as [number, number])}
                  className="my-4"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                Minimum Rating: {rating}
              </label>
              <div className="px-2">
                <Slider
                  min={0}
                  max={10}
                  step={0.5}
                  value={rating}
                  onChange={(value) => setRating(value as number)}
                  className="my-4"
                />
              </div>
            </div>

            <button
              onClick={clearAll}
              className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaFilter;