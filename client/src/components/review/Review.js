import Rating from '../rating/Rating';
import './review.css';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import LikeButton from '../like_button/LikeButton';
import { filmCriticApi } from '../../services/filmCritic';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import CommentSection from '../comment_section/CommentSection';

const Review = ({ className, style, review, loggedOnUser }) => {
    const { data: likes, error, isLoading } = filmCriticApi.useGetReviewLikesByReviewIdQuery(review.reviewId);
    const { data: comments, isLoading: loadingComments, error: commentsError } = filmCriticApi.useGetCommentsQuery({ reviewId: review.reviewId });
    const [isCommenting, setIsCommenting] = useState(false);

    const [showComments, setShowComments] = useState(true);

    function renderLikesDetails() {
        if (!likes) return <></>
        var result = likes.slice(0,10).map(like => <Link className='hidden-link' key={like.reviewLikeId} to={`/profile/${like.user.username}`}>
            <span className='liker-text'>{`${like.user.firstName} ${like.user.lastName}`}</span>
        </Link>)
        if (result.length < likes.length) {
            var diff = likes.length - result.length;
            result.push(<span key='more' className='liker-text'>{`and ${diff} more`}</span>)
        }
        return result;
    }

    return <div className={`${className} ` + " review-container"} style={style}>
        <div className='actual-review-container container-round shadow'>
            <div className='review-header'>
                <div className='header-left'>
                    <div className='review-header-rating-container'>
                        <Rating className='review-rating' text size={'medium'}>{review.rating}</Rating>
                    </div>
                    <Link className='hidden-link' to={`/profile/${review.user.username}`}>
                        <div className='user-info'>
                            <span className='review-first-name'>{review.user.firstName + " " + review.user.lastName}</span>
                            <span className="review-username">{'@'+review.user.username}</span>
                        </div>
                    </Link>
                </div>
                <div className='header-right'>
                    { review.userId === loggedOnUser?.userId &&
                        <i className='fas fa-ellipsis-h'></i>
                    }
                </div>
            </div>
            <div className='review-body'>
                <p>{review.text}</p>
            </div>
            <div className='details'>
                <div className="details-container">
                    <div className='info-container'>
                        { likes?.length > 0 &&
                            <div className='info-popup'>
                                {renderLikesDetails()}
                            </div>
                        }
                        <span className='info-text'>{likes && likes.length}</span>
                        <i className="fas fa-thumbs-up"></i>
                    </div>
                    <div className='info-container' onClick={() => setShowComments(!showComments)}>
                        <span className='info-text'>{comments && comments.length}</span>
                        <i className="fas fa-comment"></i>
                    </div>
                </div>
                <hr />
            </div>
            <div className='review-footer'>
                <div className='footer-buttons'>
                    <LikeButton review={review} alreadyLiked={likes && likes.some(l => l.userId === loggedOnUser.userId)} />
                    <button disabled={!loggedOnUser.hasOwnProperty('username')} className={`like-button ${isCommenting ? 'liked' : ''}`} type='button' onClick={() => {
                        if (!isCommenting === true) {
                            setShowComments(true);
                        }
                        setIsCommenting(!isCommenting);
                    }}>
                        <i className={`fa${isCommenting ? "s" : "r"} fa-comment`}></i>
                        { !isCommenting &&
                            <span className='like-button-text'>Comment</span>
                        }
                    </button>
                </div>
                <Moment className='review-date' format='MMMM Do, YYYY \at h:mm A' >{review.created}</Moment>
            </div>
        </div>
        <CommentSection isCommenting={isCommenting} review={review} comments={comments} isLoading={loadingComments} error={commentsError} showComments={showComments} />
    </div>
}

function mapStateToProps(state) {
    return {
        loggedOnUser: {...state.users.loggedOnUser}
    }
}

export default connect(mapStateToProps)(Review);