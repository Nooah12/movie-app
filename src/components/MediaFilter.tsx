'use client'

import { useState, useEffect, useMemo } from "react";
import { FiChevronDown } from "react-icons/fi";
import dynamic from 'next/dynamic';
import { GenreType } from "@/utils/types";

const Slider = dynamic(() => import('rc-slider'), {
  ssr: false,
});
import "rc-slider/assets/index.css";

interface MediaFilterProps {
  onFilterChange?: (filters: {
    genres: string[];
    languages: string[];
    yearRange: number[];
    rating: number;
  }) => void;
}

const MediaFilter = ({ onFilterChange }: MediaFilterProps) => {
  const currentYear = new Date().getFullYear();
  const [genres, setGenres] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([1920, currentYear]);
  const [rating, setRating] = useState<number>(5);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [genreSearch, setGenreSearch] = useState("");
  const [languageSearch, setLanguageSearch] = useState("");
  const [genreOptions, setGenreOptions] = useState<GenreType[]>([]);
  const [languageOptions, setLanguageOptions] = useState<string[]>([]);

  const filteredGenres = useMemo(() => {
    console.log('Filtering genres:', genreOptions); // Debug log
    return genreOptions?.filter(genre =>
      genre?.name?.toLowerCase().includes(genreSearch.toLowerCase())
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreSearch, genreOptions]);

  const filteredLanguages = useMemo(() => {
    console.log('Filtering languages:', languageOptions); // Debug log
    return languageOptions.filter(language =>
      language.toLowerCase().includes(languageSearch.toLowerCase())
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageSearch, languageOptions]);

  const handleGenreSelect = (genre: string) => {
    setGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
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

  useEffect(() => {
    onFilterChange?.({
      genres,
      languages,
      yearRange,
      rating
    });
  }, [genres, languages, yearRange, rating, onFilterChange]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const genreResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const languageResponse = await fetch(
          `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
  
        const genreData = await genreResponse.json();
        const languageData = await languageResponse.json();
  
        setGenreOptions(genreData.genres);
        setLanguageOptions(languageData.map((lang: { english_name: string }) => lang.english_name));

      } catch (error) {
        console.error("Failed to fetch filter options:", error);
      }
    };
  
    fetchFilterOptions();
  }, []);

  return (
    <div className=" bg-background p-4 font-inter">
      <div className="max-w-7xl mx-auto bg-card rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section - Dropdowns */}
          <div className="lg:w-1/2 space-y-4">

            {/* Genre Dropdown */}
            <div className="dropdown-container relative">
              <label className="block text-sm font-body mb-2 text-foreground">
                Genres {genres.length > 0 && `(${genres.length})`}
              </label>
              <div
                className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:border-primary"
                onClick={(e) => {
                  e.stopPropagation(); // Add this
                  setIsGenreOpen(!isGenreOpen);
                  console.log('Genre dropdown clicked'); // Add this
                }}
              >
                <span className="text-sm text-muted-foreground">
                  {genres.length ? `${genres.length} selected` : "Select genres"}
                </span>
                <FiChevronDown className={`transition-transform ${isGenreOpen ? "rotate-180" : ""}`} />
              </div>
              {isGenreOpen && (
                <div className="absolute z-10 w-full mt-2 bg-card border rounded-lg shadow-lg">
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search genres..."
                      className="w-full p-2 text-sm border rounded-md"
                      value={genreSearch}
                      onChange={(e) => setGenreSearch(e.target.value)}
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredGenres.map((genre: GenreType) => (
                      <div
                        key={genre.id}
                        className="flex items-center px-4 py-2 hover:bg-accent cursor-pointer"
                        onClick={() => handleGenreSelect(genre.name)}
                      >
                        <input
                          type="checkbox"
                          checked={genres.includes(genre.name)}
                          onChange={() => {}}
                          className="mr-2"
                        />
                        <span className="text-sm text-muted-foreground">{genre.name}</span>
                        
                      </div>
                    ))}
                  </div>
                  {genres.length > 0 && (
                    <div className="p-2 border-t">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearGenres();
                        }}
                        className="text-sm text-destructive hover:text-destructive/90"
                      >
                        Clear genres
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Language Dropdown */}
            <div className="dropdown-container relative">
              <label className="block text-sm font-body mb-2 text-foreground">
                Languages {languages.length > 0 && `(${languages.length})`}
              </label>
              <div
                className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:border-primary"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <span className="text-sm text-muted-foreground">
                  {languages.length ? `${languages.length} selected` : "Select languages"}
                </span>
                <FiChevronDown className={`transition-transform ${isLanguageOpen ? "rotate-180" : ""}`} />
              </div>
              {isLanguageOpen && (
                <div className="absolute z-10 w-full mt-2 bg-card border rounded-lg shadow-lg">
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search languages..."
                      className="w-full p-2 text-sm border rounded-md"
                      value={languageSearch}
                      onChange={(e) => setLanguageSearch(e.target.value)}
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredLanguages.map((language) => (
                      <div
                        key={language}
                        className="flex items-center px-4 py-2 hover:bg-accent cursor-pointer"
                        onClick={() => handleLanguageSelect(language)}
                      >
                        <input
                          type="checkbox"
                          checked={languages.includes(language)}
                          onChange={() => {}}
                          className="mr-2"
                        />
                        <span className="text-sm text-muted-foreground">{language}</span>
                      </div>
                    ))}
                  </div>
                  {languages.length > 0 && (
                    <div className="p-2 border-t">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearLanguages();
                        }}
                        className="text-sm text-destructive hover:text-destructive/90"
                      >
                        Clear languages
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/*  Sliders */}
          <div className="lg:w-1/2 space-y-6">
            {/* Year Range Slider */}
            <div>
              <label className="block text-sm font-body mb-2 text-foreground">
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

            {/* Rating Slider */}
            <div>
              <label className="block text-sm font-body mb-2 text-foreground">
                Minimum Rating: {rating}
              </label>
              <div className="px-2">
                <Slider
                  min={0}
                  max={10}
                  value={rating}
                  onChange={(value) => setRating(value as number)}
                  className="my-4"
                />
              </div>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={clearAll}
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors"
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