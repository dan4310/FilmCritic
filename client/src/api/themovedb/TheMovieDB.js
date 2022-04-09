import secrets from '../../secrets';
import axios from 'axios';

const BASE_URL = `https://api.themoviedb.org/3/`;
const API_URL = `?api_key=${secrets.MOVIEDB_KEY}&language=en-US'&sort_by=popularity.desc&include_adult=false&page=1&with_watch_monetization_types=flatrate'`;
const IMAGE_BASE = 'https://image.tmdb.org/t/p/original/';

function getPoster(posterpath) {
    return IMAGE_BASE + posterpath;
}

// Movies
function getMovieGenres() {
    const endpoint = 'genre/movie/list';
    const url = BASE_URL + endpoint + API_URL;
    return url;
}

function getMoviesByGenre(genreId) {
    const endpoint = 'discover/movie';
    const url = BASE_URL + endpoint + API_URL + `&with_genres=${genreId}`;
    return url;
}

function getTrendingMovies() {
    const endpoint = 'trending/movie/day';
    const url = BASE_URL + endpoint + API_URL;
    return url;
}

function getMovieById(id) {
    const url = BASE_URL + `movie/${id}` + API_URL;
    return url;
}

function getPopularMovies() {
    const url = BASE_URL + 'movie/popular' + API_URL;
    return url;
}

function searchMovies(query) {
    if (query.length === 0) {
        return getPopularMovies();
    }
    
    const url = BASE_URL + "search/movie"+ API_URL + "&query="+query;
    return url;
}

function getMoviesWithGenres(genres) {
    const url = BASE_URL + 'discover/movie' + API_URL +`&with_genres=${genres.join(',')}`;
    return url;
}

async function getMovieGenresAsync() {
    const data = await axios.get(getMovieGenres());
    return data.data.genres;
}

// Shows

function getShowById(id) {
    const url = BASE_URL + `tv/${id}` + API_URL;
    return url;
}

function getShowsWithGenres(genres) {
    const url = BASE_URL + 'discover/tv' + API_URL +`&with_genres=${genres.join(',')}`;
    return url;
}

function getTrendingShows() {
    const endpoint = 'trending/tv/day';
    const url = BASE_URL + endpoint + API_URL;
    return url;
}

function getShowGenres() {
    const endpoint = 'genre/tv/list';
    const url = BASE_URL + endpoint + API_URL;
    return url;
}

async function getShowGenresAsync() {
    const data = await axios.get(getShowGenres());
    return data.data.genres;
}

function getPopularShows() {
    const url = BASE_URL + 'tv/popular' + API_URL;
    return url;
}

function searchShows(query) {
    if (query.length === 0) {
        return getPopularShows();
    }
    const url = BASE_URL + "search/tv"+ API_URL + "&query="+query;
    return url;
}

async function test() {
    const shows = await axios.get(getTrendingShows());
    console.log('Shows')
    console.log(shows.data.results[0])
    const movies = await axios.get(getTrendingMovies())
    console.log('Movies')
    console.log(movies.data.results[0])
}

const TheMovieDB = {
    getMovieGenres,
    getMoviesByGenre,
    getPoster,
    getTrendingMovies,
    getMovieById,
    getShowGenres,
    getTrendingShows,
    getShowById,
    getPopularMovies,
    searchMovies,
    getPopularShows,
    searchShows,
    getShowGenresAsync,
    getMovieGenresAsync,
    getMoviesWithGenres,
    getShowsWithGenres,
    test
}

export default TheMovieDB;