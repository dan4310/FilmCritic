import { useEffect, useState } from 'react';
import TheMovieDB from '../../api/themovedb/TheMovieDB';
import useQuery from '../../helpers/useQuery';
import Page from '../../components/page/Page';
import Error from '../../components/error/Error';
import MoviePoster from '../../components/movie_poster/MoviePoster';
import './moviesPage.css';
import SearchBar from '../../components/search_bar/SearchBar';
import Badge from '../../components/badge/Badge';

const MoviesPage = ({ className , style, show }) => {
    const [query, setQuery] = useState('');
    const [genres, setGenres] = useState([]);
    const [movies, setMovies] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    const [isQuerying, setIsQuerying] = useState(false);

    useEffect(async () => {
        if (show) {
            setAllGenres(await TheMovieDB.getShowGenresAsync());
        } else {
            setAllGenres(await TheMovieDB.getMovieGenresAsync());
        }
        setGenres([])
    }, [show]);

    useEffect(() => {
        if (query.length > 0) {
            setIsQuerying(true)
        } else {
            setIsQuerying(false);
        }
    }, [query]);

    const { data, loading, error, refetch } = useQuery(getQuery());
    function getQuery() {
        if (show) {
            if (isQuerying) {
                return TheMovieDB.searchShows(query);
            }
            return TheMovieDB.getShowsWithGenres(genres);
        } else {
            if (isQuerying) {
                return TheMovieDB.searchMovies(query);
            }
            return TheMovieDB.getMoviesWithGenres(genres);
        }
    }

    useEffect(() => {
        if (data) {
            var temp = [];
            data.results.forEach(m => {
                if (m.poster_path){
                    temp.push(m);
                }
            })
            setMovies(temp);
        }
    },[data]);

    function clickGenre(id) {
        var temp = genres;
        if (genres.includes(id)){
            temp.splice(temp.indexOf(id), 1);
        } else {
            temp.push(id);
        }
        setGenres(temp);
        if (!isQuerying){
            refetch();
        }
    }

    if (error) {
        return <Page center><Error>{error}</Error></Page>
    }

    return <Page className={className + ' movies-page layout-3panel'} style={style}>
        <div className='left-panel'></div>
        <div className='center-panel'>
            <div className='search-tools-container'>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                    <SearchBar setter={setQuery}></SearchBar>
                </div>
                <div className='genres-container'>
                    {allGenres.map(g => <Badge key={g.id} 
                        onClick={() => clickGenre(g.id)}
                        disabled={isQuerying}
                    >{g.name}</Badge>)}
                </div>
            </div>
            <div className='movies-container'>
                {movies.map(m => <MoviePoster show={show ? show : false} hideRating key={m.id} movie={m} skeleton={loading} />)}
            </div>
        </div>
        <div className='right-panel'></div>
    </Page>
}

export default MoviesPage;