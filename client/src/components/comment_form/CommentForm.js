import './commentForm.css';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { filmCriticApi } from '../../services/filmCritic';

const CommentForm = ({ className, style, review, loggedOnUser }) => {
    const [text, setText] = useState('');
    const [createComment, { data, isLoading, error }] = filmCriticApi.useCreateCommentMutation();

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (data) {
            setText('');
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 2000);
        }
    }, [data]);

    function renderSuccess() {
        if (isLoading) {
            return <p>Posting...</p>
        }
        if (error) {
            return <p className='red'>{error.message}</p>
        }
        if (showSuccess) {
            return <p className='green'>Post successful!</p>
        }
    }

    return <form className={`comment-form-container ${className}`} style={style}>
        <div className='comment-form-header'>
            <div className='comment-form-header-left'>
                <div className='user-info'>
                    <span className='review-first-name'>{loggedOnUser.firstName + " " + loggedOnUser.lastName}</span>
                    <span className="review-username">{'@'+loggedOnUser.username}</span>
                </div>
            </div>
            <div className='comment-form-header-right'>
                {renderSuccess()}
            </div>
        </div>
        <textarea value={text}  onChange={(e) => setText(e.target.value)}/>
        <div className='comment-form-footer'>
            <button className='btn-large' type='button' disabled={text.length === 0 || isLoading}
                onClick={() => createComment({
                    reviewId: review.reviewId,
                    text
                })}
            >
                <span className='btn-text'>Post</span>
            </button>
        </div>
    </form>
}

function mapStateToProps(state) {
    return {
        loggedOnUser: {...state.users.loggedOnUser}
    }
}

export default connect(mapStateToProps)(CommentForm);