export interface Type {
    map(arg0: (result: Type) => import("react").JSX.Element): import("react").ReactNode;
    id: number;
    title: string;
    original_title: string;
    original_language: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    adult: boolean;
    video: boolean;
    genre_ids: number[];
    media_type: 'movie' | 'tv' | 'person';
    //tv
    name: string;
    original_name: string;
    first_air_date: string;
    origin_country: string[];
    profile_path: string;
}

export interface GenreType {
    toLowerCase(): unknown;
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