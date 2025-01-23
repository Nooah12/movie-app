"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
//import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type: string;
}

export default function HeroSlider() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch trending movies/shows
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await response.json();
        setMediaItems(data.results.slice(0, 5)); // Get first 5 items
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching trending media:", error);
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const nextSlide = useCallback((): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
  }, [mediaItems.length]); 

  useEffect(() => {
    if (!isHovered && mediaItems.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, mediaItems.length, nextSlide]);

  if (isLoading) {
    return <div className="h-[460px] bg-gray-900 animate-pulse"></div>;
  }

  if (mediaItems.length === 0) {
    return <div>No media items found</div>;
  }

  const currentItem = mediaItems[currentIndex];

  const getMediaUrl = (item: MediaItem): string => {
    const mediaTypeUrl = item.media_type === 'movie' ? 'movies' : 'tv';
    return `/${mediaTypeUrl}/${item.id}`;
  };

  return (
    <div className="relative w-full mx-auto">
      <div
        className="relative h-56 md:h-96 lg:h-[33rem] group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Backdrop Image */}
        <Image
          src={`https://image.tmdb.org/t/p/original${currentItem.backdrop_path}`}
          alt={currentItem.title || currentItem.name || "Media"}
          layout="fill"
          objectFit="cover"
          className="brightness-75"
          priority
        />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="md:text-xl xl:text-4xl font-bold text-white mb-2">
            {currentItem.title || currentItem.name}
          </h2>
          <p className="hidden md:block text-xs lg:text-sm text-gray-200 line-clamp-2 mb-2 md:max-w-md xl:max-w-xl">
            {currentItem.overview}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">★</span>
            <span className="text-white">
              {currentItem.vote_average.toFixed(1)}
            </span>
          </div>
          <Link 
              href={getMediaUrl(currentItem)}
              className="text-sm md:text-base inline-flex items-center px-2 py-1.5 md:px-4 md:py-2
                bg-[#00DF9A] hover:bg-[#00EBA7] 
                text-black font-semibold rounded-lg 
                transition-all duration-200
                hover:scale-105 active:scale-95 font-roboto"
            >
              Details
            <svg 
                className="w-4 h-4 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                />
            </svg>
            </Link>
        </div>
      </div>

      {/* Navigation Buttons */}
{/*       <button
        className="absolute left-0 top-1/2 transform h-[459px] rounded-xl 
                   hover:bg-black/20 mx-1 -mt-[10px] -translate-y-1/2 
                   bg-black/10 text-white p-2 group transition-all"
        onClick={prevSlide}
      >
        <ChevronLeft className="text-white/70 group-hover:text-white" />
      </button>
      <button
        className="absolute right-0 top-1/2 transform h-[459px] rounded-xl 
                   hover:bg-black/20 mx-1 -mt-[10px] -translate-y-1/2 
                   bg-black/10 text-white p-2 group transition-all"
        onClick={nextSlide}
      >
        <ChevronRight className="text-white/70 group-hover:text-white" />
      </button> */}

      {/* Indicators */}
      <div className="flex justify-center mt-4">
        {mediaItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 w-10 mx-1 transition-all duration-500 ease-in-out
               ${index === currentIndex 
                ? "bg-[#beff46] rounded-xl" 
                : "bg-gray-300 rounded-xl"}`}
          />
        ))}
      </div>
    </div>
  );
}
