export interface Movie {
    id: number;
    title: string;
    releaseDate: string;
    rating: number;
    watched: boolean;
}

export interface TmdbMovie {
    id: number;
    title: string;
    release_date: string;
    poster_path: number | null;
    overview: string;
}