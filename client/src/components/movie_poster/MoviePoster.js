import './moviePoster.css';
import TheMovieDB from '../../api/themovedb/TheMovieDB';
import Rating from '../rating/Rating';
import { Link } from 'react-router-dom';

const MoviePoster = ({ className, style, movie, skeleton, fill, hideRating, show }) => {

    if (fill) {
        return <img className='movie-poster-large shadow' src={TheMovieDB.getPoster(movie.poster_path)}
        alt={movie.original_title}
    />
    }
    
    if (skeleton) {
        return <div className='skeleton-poster'><div className='img-skeleton'></div></div>
    }
    function getLink() {
        if (show) {
            return `/show/${movie.id}`;
        }
        return `/movie/${movie.id}`;
    }
    
    return <Link to={getLink()}><div className={className + ' movie-poster shadow-small'} style={style}>
        <Rating className={"movie-rating " + (hideRating ? 'd-none' : '')}>{movie.vote_average.toFixed(1)}</Rating>
        <img className='img-poster' loading='lazy' src={TheMovieDB.getPoster(movie.poster_path)}
            alt={movie.original_title}
        />
    </div></Link>
}

export default MoviePoster;