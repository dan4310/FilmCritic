import './moviePage.css';
import { useParams } from 'react-router-dom';
import useQuery from '../../helpers/useQuery';
import TheMovieDB from '../../api/themovedb/TheMovieDB';
import Error from '../../components/error/Error';
import { useEffect, useState } from 'react';
import MoviePoster from '../../components/movie_poster/MoviePoster';
import Rating from '../../components/rating/Rating';
import Page from '../../components/page/Page';
import Badge from '../../components/badge/Badge';
import ReviewForm from '../../components/review_form/ReviewForm';
import { connect } from 'react-redux';
import MovieReviews from '../../components/movie_reviews/MovieReviews';
import Moment from 'react-moment';

const MoviePage = ({ className, style, show, user }) => {
    const { id } = useParams();
    const { data, error, loading } = useQuery(show ? TheMovieDB.getShowById(id) : TheMovieDB.getMovieById(id));
    
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [movie, setMovie] = useState({});

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        if (data) {
            setMovie(data);
            setIsSkeleton(false);
        }
    },[data])

    function renderFact(prop, fact) {
        return <div className='fact-container' key={prop}>
            <span className='fact-prop'>{prop}</span>
            <span className='fact container-round-sm'>{fact}</span>
        </div>
    }

    function renderMovieFacts() {
        var temp = [];
        if (movie.runtime) {
            temp.push(renderFact("Runtime", `${movie.runtime} mins`));
        }
        if (movie.release_date) {
            temp.push(renderFact("Released", <Moment format='MMM. Do YYYY'>{movie.release_date}</Moment>))
        }
        if (movie.budget) {
            temp.push(renderFact("Budget", formatter.format(`${movie.budget}`)))
        }
        if (movie.revenue) {
            temp.push(renderFact("Revenue", formatter.format(`${movie.revenue}`)))
        }
        return temp;   
    }

    function renderShowFacts() {
        
    }

    if (error) {
        return <Page className={className + ' movie-page'} center style={style}><Error>{error}</Error></Page>
    }

    if (loading || (!movie.title && !movie.name)) {
        return <Page className={className + ' movie-page'} style={style}></Page>
    }

    return <Page className={className + ' movie-page layout-3panel'} style={style}>
        <div className='left-panel'>
            
        </div>
        <div className='center-panel'>
            <div className='movie-header'>
                <div className="poster-container">
                    <MoviePoster movie={movie} fill />
                </div>
                <div className='header-info-container'>
                    <div className='header-top'>
                        <div className='title-rating'>
                            <div className='movie-title'>
                                <h1>{show ? movie.name : movie.title}</h1>
                                <h3>{movie.tagline}</h3>
                            </div>
                            <div>
                                { movie.vote_average &&
                                    <Rating size={'large'}>{movie.vote_average}</Rating>
                                }
                            </div>
                        </div>
                        <div className='quick-facts-container'>
                            {!show ? renderMovieFacts() : renderShowFacts() }
                        </div>
                    </div>
                    <div className='header-bottom'>
                        <div  className='genres-container'> 
                            { movie.genres &&
                                movie.genres.map(g => <Badge key={g.id}>{g.name}</Badge>)
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='overview-container'>
                <h2>Overview</h2>
                <div className='container-round shadow'>
                    <p>{movie.overview}</p>
                </div>
            </div>
            <MovieReviews movie={movie}/>
        </div>
        <div className='right-panel'>
        </div>
    </Page>
    
}

function mapStateToProps(state) {
    return {
        user: {...state.users.loggedOnUser}
    }
}

export default connect(mapStateToProps)(MoviePage);