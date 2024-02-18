import axios from "axios";
import React from "react";

const BASE_ENDPOINT_URL = 'https://api.themoviedb.org/3/'
export const DETAILS_ENDPOINT = "movie/"
export const LATEST_MOVIES_ENDPOINT = "trending/all/day?language=en-US&page="
export const SEARCH_MOVIES_ENDPOINT = "search/movie?language=en-US&query="

export const axios_instance = axios.create({
    baseURL: BASE_ENDPOINT_URL,
    timeout: 10000,
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzkzYjc3Zjg0OWE2NmE5NjFlZDA2NWYyOTUyODY1YSIsInN1YiI6IjY1ZDA0ZWJiZmNiOGNjMDE3YjQ0YmVlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a8BdqvFha1eGnf4L1cEjef9MGy_uWFaJwDUlfQ3SRkc'
    }
});

export const IMAGE_URL = "https://image.tmdb.org/t/p/original"

export const HomeTabContext = React.createContext({})