import './movieRow.css';
import TheMovieDB from '../../api/themovedb/TheMovieDB';
import useQuery from '../../helpers/useQuery';
import { useEffect, useState } from 'react';
import MoviePoster from '../movie_poster/MoviePoster';
import Error from '../error/Error';

const MovieRow = ({ className, style, genre }) => {
    const { data, loading, error } = useQuery(TheMovieDB.getMoviesByGenre(genre.id));
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [movies, setMovies] = useState([0,1,2,3,4,5,6,7,8,9,10]);

    useEffect(() => {
        if (data) {
            setMovies(data.results);
            setIsSkeleton(false);
        }
    }, [data])

    if (error) {
        return <Error size='small' className={className + ' movie-row'} >{error}</Error>
    }

    // if (loading) {
    //     return skeletons.map(num => <MoviePoster key={num} skeleton={true} />)
    // }

    return <div className={className + ' movie-row-container'} style={style}>
        <h2 className='genre-name'>{genre.name}</h2>
        <div className='movie-row'>
            {movies.map((m, ind) => <MoviePoster className="row-poster" key={ind} movie={m} skeleton={isSkeleton} />)}
        </div>
    </div>
}

export default MovieRow;
