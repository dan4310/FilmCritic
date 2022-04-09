import { filmCriticApi } from '../../services/filmCritic';
import './likeButton.css';
import { connect } from 'react-redux';

const LikeButton = ({ className, style, review, alreadyLiked, isLoggedIn }) => {
    const [createReviewLike, { data, error, isLoading: isCreateLikeLoading }] = filmCriticApi.useCreateReviewLikeMutation();
    const [deleteReviewLike, { isLoading: isDeleteLikeLoading}] = filmCriticApi.useDeleteReviewLikeMutation();


    function onButtonClick() {
        if (alreadyLiked) {
            deleteReviewLike({
                reviewId: review.reviewId
            })
        } else {
            createReviewLike({
                reviewId: review.reviewId
            });
        }
    }

    return <button className={`like-button ${className} ${ alreadyLiked ? 'liked' : ''}`} disabled={isCreateLikeLoading || isDeleteLikeLoading || isLoggedIn}
     style={style} onClick={() => onButtonClick()} type='button'>
        <i className={`${alreadyLiked ? 'fas' : 'far'} fa-thumbs-up`}></i>
        { !alreadyLiked &&
            <span className='like-button-text'>Like</span>
        }
    </button>
}

function mapStateToProps(state) {
    return {
        isLoggedIn: !{...state.users.loggedOnUser}.hasOwnProperty("username")
    }
}

export default connect(mapStateToProps)(LikeButton);