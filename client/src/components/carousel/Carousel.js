import './carousel.css';
import useQuery from '../../helpers/useQuery';
import TheMovieDB from '../../api/themovedb/TheMovieDB';
import { useEffect, useState } from 'react';

const Carousel = ({ className, style }) => {
    const { data, error, loading } = useQuery(TheMovieDB.getTrendingMovies());
    const [movies, setMovies] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (data) {
            setMovies(data.results);
        }
    }, [data]);

    function goLeft() {
        if (index != 0) {
            setIndex(index-1);
        } else {
            setIndex(movies.length-1);
        }
    }
    function goRight() {
        if (index != movies.length-1) {
            setIndex(index+1);
        } else {
            setIndex(0);
        }
    }

    if (movies.length > 0) {
        return <div className={className + " carousel-container"} style={style}>
            <button className="carousel-button left" onClick={() => goLeft()}>
                <i className="fas fa-chevron-left"></i>
            </button>
            <button className='carousel-button right' onClick={() => goRight()}>
                <i className="fas fa-chevron-right"></i>
            </button>
            <div className='movie-container'>
                <div className='carousel-shadow'></div>
                <div className='carousel-shadow-left'></div>
                <div className='carousel-shadow-right'></div>

                <div className='movie-info-container'>
                    <div className="title-container">
                        <h1>{movies[index].original_title}</h1>
                        <p>{movies[index].overview}</p>
                    </div>
                </div>
                <div className='carousel-image-container'>
                    <img className='carousel-image'
                        src={TheMovieDB.getPoster(movies[index].backdrop_path)}
                    />
                </div>
                
            </div>
            
        </div>
    }
    return <div className={className + " carousel-container"} style={style}></div>
}

export default Carousel;