import { useEffect } from "react";
import { filmCriticApi } from "../../services/filmCritic";
import Review from "../review/Review";
import ReviewForm from "../review_form/ReviewForm";
import { connect } from "react-redux";
import './movieReviews.css';

const MovieReviews = ({ className, style, movie, loggedOnUser }) => {
    const { data, error, isLoading } = filmCriticApi.useGetReviewsByMovieQuery(movie);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error])

    function render() {
        if (error) {
            return <h2>{error}</h2>
        } else if (isLoading) {
            return <h2>Loading...</h2>
        }
        return data.map(review => <Review key={review.reviewId} review={review} />)
    }
    return <div className={`${className} ` + 'review-feed-container'} style={style}>
        { data?.some(review => review.userId === loggedOnUser.userId) || !loggedOnUser.hasOwnProperty('username') ?
            <></>
            :
            <ReviewForm movie={movie} />
        }
        <h2>Reviews</h2>
        <div className='review-list'>
            {render()}
        </div>
    </div>
}


function mapStateToProps(state) {
    return {
        loggedOnUser: {...state.users.loggedOnUser}
    }
}
export default connect(mapStateToProps)(MovieReviews);