import "./reviewForm.css";
import { connect } from "react-redux";
import Input from "../input/Input";
import Badge from "../badge/Badge";
import { useEffect, useState } from "react";
import Rating from "../rating/Rating";
import { updateFormData } from "../../features/validation/validationSlice";
import { filmCriticApi } from "../../services/filmCritic";

const ReviewForm = ({ className, style, user, review, updateReview, movie }) => {
    const [isReviewing, setIsReviewing] = useState(false);
    const [createReview, { data, error, isLoading }] = filmCriticApi.useCreateReviewMutation();

    useEffect(() => {
        updateReview('text', '');
        updateReview('rating', 8.2);
        if (movie.title === undefined) {
            updateReview('isShow', true);
        } else {
            updateReview('isShow', false);
        }
        updateReview('movieId', movie.id);
    }, [movie]);

    useEffect(() => {
        if (data) {
            setIsReviewing(false);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            console.log(error)
        }
    }, [error]);

    if (!isReviewing) {
        return <div><button className="review-form-button" onClick={() => setIsReviewing(true)}>
            <i className="fa fa-comment review-icon"></i>
            <span className='leave-a-review-text'>Leave a review</span>
        </button></div>
    }

    return <form className={'review-form container-round shadow '+className} style={style}>
        <div className='form-controls'>
            <span className='leave-a-review-text'>Create review</span>
            <div className="form-close-container">
                <i className="fas fa-times form-close-icon" onClick={() => setIsReviewing(false)}></i> 
            </div>
        </div>
        <hr />
        <div className="form-header">
            <div className='review-header-rating-container'>
                <Rating className='review-rating' size='medium' text>{review.rating}</Rating>
            </div>
            <div className='user-info'>
                <span className='review-first-name'>{user.firstName + " " + user.lastName}</span>
                <span className="review-username">{'@'+user.username}</span>
            </div>
        </div>
        <div className='review-input-container'>
            <textarea value={review.text} onChange={(e) => updateReview('text', e.target.value)} />
        </div>
        <div className="form-footer">
            <div className="slider-container">
                <input className="rating-slider" type="range" min="0" max='10' step={0.1} onInput={(e) => updateReview("rating", e.target.value)} />
                <i className="fas fa-chart-line chart-icon"></i>
            </div>
            <button className='btn-large' type="button" disabled={isLoading || review.text.length === 0} onClick={() => createReview(review)}>
                <span className="btn-text">Post</span>
            </button>
        </div>
    </form>
}

function mapStateToProps(state) {
    let data = {
        user: {...state.users.loggedOnUser},
        review: {...state.validation.reviewForm.formData}
    }
    return {...data};
}

function mapDispatchToProps(dispatch) {

    return {
        updateReview: (name, value) => dispatch(updateFormData({
            form: 'reviewForm',
            name,
            value
        })),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);