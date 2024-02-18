import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { fetch_movies, search_movies } from "../shared/functions";
import { CardUI, SearchBox } from "../others/Reusables";
import { useAppTheme } from "../shared/appTheme";
import { FlashList } from "@shopify/flash-list";
import { HomeTabContext, IMAGE_URL } from "../shared/constants";
import { useAppDispatch, useAppSelector } from "../shared/hooks";
import { updatePageNumber, updateMovieSearchPageNumber, addFavoriteMovie, addWishlistMovie } from "../shared/redxSlice";


import MultiSelectDropdown from "../others/FilterDropdown";

const HomeTab = React.memo((props: any) => {
    const [movieList, setMovieList] = React.useState([])
    const [filteredMovies, setFilteredMovies] = useState([]);
    const theme = useAppTheme('', '')
    const dispatch = useAppDispatch()
    const currentMoviePage = useAppSelector(state => state.main.page)
    const currentSearchMoviePage = useAppSelector(state => state.main.searchMoviePage)
    const searchValue = useAppSelector(state => state.main.searchValue)

    const [selectedReleaseDates, setSelectedReleaseDates] = useState([]);
    const [selectedPopularity, setSelectedPopularity] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);

    const favoriteMovies = useAppSelector((state: any) => state.main.favoriteMovies);
    const wishlistMovies = useAppSelector((state: any) => state.main.wishlistMovies)

    console.log("wishlistMovies", wishlistMovies)

    const [selected, setSelected] = useState([]);

    const get_movies = React.useCallback(async (page?: number) => {
        const req_page = page ?? currentMoviePage
        const request = await fetch_movies(req_page)

        if (request == undefined) return Alert.alert('Error', "An error occured while fetching movies")

        if (page == undefined || page == 1) {
            setMovieList([])
            setTimeout(() => {
                setMovieList(request.results)
            }, 500);
        } else {
            const all_movies = [...movieList, ...request.results] as any
            setMovieList(all_movies)
        }
        dispatch(updatePageNumber(request.page))

    }, [currentMoviePage, movieList])

    React.useLayoutEffect(() => {
        get_movies()
    }, [])

    useEffect(() => {
        if (selected.length === 0) {
            setFilteredMovies(movieList);
        } else {
            const filtered = movieList.filter(movie => selected.includes(movie.release_date));
            setFilteredMovies(filtered);
        }
    }, [selected, movieList]);

    const handleLoadMoreMovies = React.useCallback(() => {
        get_movies(currentMoviePage + 1)
    }, [currentMoviePage, searchValue])

    const handleRouteToDetailsPage = React.useCallback((movie_id: number) => {
        props.navigation.navigate('movieDetails', { movie_id })
    }, [])

    const handleRouteToSearchPage = React.useCallback(() => {
        props.navigation.navigate('Search')
    }, [])

    // search
    const handleSearch = React.useCallback(async (page = 1) => {
        console.log("currentSearchMoviePage in search:", currentSearchMoviePage, page);
        if (!searchValue) {
            get_movies();
            return;
        }
        const request = await search_movies(searchValue, page)
        if (request == undefined) return Alert.alert('Error Searching', "An error occured while searching please try again")
        console.log(request)
        if (page == 1) {
            setMovieList([])
            setTimeout(() => {
                setMovieList(request.results)
            }, 800);
        } else {
            const all_movies = [...movieList, ...request.results] as any
            setMovieList(all_movies)
        }
        dispatch(updateMovieSearchPageNumber(request.page))

    }, [searchValue, movieList])

    const handleAddToFavorites = (movie: any) => {
        dispatch(addFavoriteMovie(movie));
        console.log("favourite", addFavoriteMovie(movie))
    };


    const handleToggleFavorite = (id: number) => {
        const isMovieFavorite = favoriteMovies.some((movie: any) => movie.id === id);
        if (isMovieFavorite) {
            dispatch(addFavoriteMovie(favoriteMovies.filter((movie: any) => movie.id !== id)));
        } else {
            const movieToAdd = movieList.find((movie: any) => movie.id === id);
            if (movieToAdd) {
                dispatch(addFavoriteMovie(movieToAdd));
            }
        }
    };

    const movieReleaseDates = movieList.map((movie: any) => ({
        label: movie.release_date,
        value: movie.release_date
    }));

    const moviePopularity = movieList.map((movie: any) => ({
        label: movie.popularity,
        value: movie.popularity
    }));

    const movieRatings = movieList.map((movie: any) => ({
        label: movie.vote_count,
        value: movie.vote_count
    }));

    const handleToggleWishlist = (id: number) => {
        const isMovieWishlist = wishlistMovies.some((movie: any) => movie.id === id);
        if (isMovieWishlist) {
            dispatch(addWishlistMovie(wishlistMovies.filter((movie: any) => movie.id !== id)));
        } else {
            const movieToAdd1 = movieList.find((movie: any) => movie.id === id);
            if (movieToAdd1) {
                dispatch(addWishlistMovie(movieToAdd1));
            }
        }
    };

    return (
        <HomeTabContext.Provider value={{}}>
            <View style={{ flex: 1, backgroundColor: theme.appBackground }}>
                <SearchBox
                    onSubmitEditing={handleSearch}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <MultiSelectDropdown
                        data={movieReleaseDates}
                        placeholder="Released"
                        selected={selectedReleaseDates}
                        setSelected={setSelectedReleaseDates}
                    />
                    {/* <MultiSelectDropdown
                        data={moviePopularity}
                        placeholder="Popularity"
                        selected={selectedPopularity}
                        setSelected={setSelectedPopularity}
                    />
                    <MultiSelectDropdown
                        data={movieRatings}
                        placeholder="Ratings"
                        selected={selectedRatings}
                        setSelected={setSelectedRatings}
                    /> */}
                </View>
                <FlashList
                    // data={selected.length === 0 ? movieList : filteredMovies}
                    data={movieList}
                    renderItem={({ item }: { item: any }) =>
                        <CardUI
                            image={IMAGE_URL + item.backdrop_path}
                            movie_id={item.id}
                            title={item.title}
                            desc={item.release_date}
                            isFavorite={favoriteMovies.some((movie: any) => movie.id === item.id)}
                            isWishlist={wishlistMovies.some((movie: any) => movie.is === item.id)}
                            onToggleFavorite={() => handleToggleFavorite(item.id)}
                            onToggleWishlist={() => handleToggleWishlist(item.id)}
                        // onAddToFavorites={() => handleAddToFavorites(item)}
                        // handleRouteToDetailsPage={handleRouteToDetailsPage}
                        />}
                    estimatedItemSize={200}
                    onEndReached={handleLoadMoreMovies}
                    onEndReachedThreshold={0}
                    // @ts-ignore
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
            </View>
        </HomeTabContext.Provider>
    )
})

export default HomeTab

