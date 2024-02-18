import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IMainState, TThemeMode, TUserDetails, Movie } from './types'




const initialState: IMainState & { userDetails: TUserDetails | null, favoriteMovies: Movie[], wishlistMovies: Movie[] } = {
    page: 1,
    searchValue: '',
    searchMoviePage: 1,
    colorMode: 'light',
    userDetails: null,
    favoriteMovies: [],
    wishlistMovies: []
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        updatePageNumber: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        updateMovieSearchPageNumber: (state, action: PayloadAction<number>) => {
            state.searchMoviePage = action.payload
        },
        updateSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        setColorMode: (state, action: PayloadAction<TThemeMode>) => {
            state.colorMode = action.payload
        },
        setUserDetails: (state, action: PayloadAction<TUserDetails>) => {
            state.userDetails = action.payload;
        },
        addFavoriteMovie: (state, action: PayloadAction<Movie>) => {
            state.favoriteMovies.push(action.payload);
        },
        addWishlistMovie: (state, action: PayloadAction<Movie>) => {
            state.wishlistMovies.push(action.payload);
        },
    },
})

export const {
    updatePageNumber,
    updateSearchValue,
    updateMovieSearchPageNumber,
    setColorMode,
    setUserDetails,
    addFavoriteMovie,
    addWishlistMovie
} = mainSlice.actions

export default mainSlice.reducer