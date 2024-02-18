export interface IMainState {
    page: number;
    searchValue: string;
    searchMoviePage: number;
    colorMode: TThemeMode;
}

export type TProductionCompanies = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface TUserDetails {
    idToken: string | null;
    scopes?: string[];
    serverAuthCode: string | null;
    user: {
        email: string;
        familyName: string | null;
        givenName: string | null;
        id: string;
        name: string | null;
        photo: string | null;
    };
}

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    isFavorite: boolean;
    isWishlist: boolean;
}

export type TThemeMode = 'light' | 'dark'