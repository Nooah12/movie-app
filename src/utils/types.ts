// Base interface for common properties between movies and TV shows
export interface MediaItem {
    id: number;
    media_type: 'movie' | 'tv' | 'person';
    original_language: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids?: number[];
    genres?: GenreType[];
}

// Movie specific interface
export interface Movie extends MediaItem {
    media_type: 'movie';
    title: string;
    original_title: string;
    release_date: string;
    adult: boolean;
    video: boolean;
    runtime?: number;
    actors?: Actor[];
}

// TV Show specific interface
export interface TVShow extends MediaItem {
    media_type: 'tv';
    name: string;
    original_name: string;
    first_air_date: string;
    origin_country: string[];
    actors?: Actor[];
}

// Person interface
export interface Person extends MediaItem {
    media_type: 'person';
    name: string;
    profile_path: string;
    known_for_department?: string;
}

// Union type for any media item
export type MediaUnion = Movie | TVShow | Person;

// For backward compatibility with existing code
export interface Type extends MediaItem {
    // These properties exist in both Movie and TVShow but with different meanings
    title: string; // movie title
    name: string;  // show name
    original_title: string;
    original_name: string;
    release_date: string;
    first_air_date: string;
    adult: boolean;
    video: boolean;
    runtime?: number;
    origin_country: string[];
    profile_path: string;
}

export interface GenreType {
    id: number;
    name: string;
}

export type User = {
    id: string;
    email?: string;
    // add other user properties ?
} | null;

export type Actor = {
    profile_path: string;
    name: string;
    biography: string;
    birthday: string;
    known_for_department: string;
  }

export type CrewMember = {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string | null;
  }