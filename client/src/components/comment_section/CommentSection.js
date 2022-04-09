import './commentSection.css';
import { connect } from 'react-redux';
import CommentForm from '../comment_form/CommentForm';
import { filmCriticApi } from '../../services/filmCritic';
import { useEffect, useState } from 'react';
import Comment from '../comment/Comment';

const CommentSection = ({ className, style, review, loggedOnUser, isCommenting, comments, isLoading, showComments, error }) => {

    const [numShown, setNumShown] = useState(1);

    if (isLoading) {
        <div className={`comment-section-container ${className}`} style={style}>
            <p>Loading...</p>
        </div>
    }

    if (!comments) {
        return <></>
    }
    
    return <div className={`comment-section-container ${className}`} style={style}>
        { isCommenting &&
            <CommentForm review={review} />
        }
        { showComments &&
            <div className='comments-section-list'>
            { comments &&
                comments.slice(0,numShown).map(c => <div key={c.commentId} className='comment-with-border'>
                    <Comment comment={c} />
                    <hr />
                </div>)
            }
            { numShown < comments.length &&
            <div className='comments-section-list-footer'>
                <button className='show-more-container' onClick={() => {
                    if (numShown + 5 <= comments.length - 1) {
                        setNumShown(numShown + 5);
                    } else {
                        setNumShown(comments.length);
                    }
                }}>
                    <span>Show More</span>
                </button>
            </div> 
            }
        </div>
        }
    </div>
}

function mapStateToProps(state) {
    return {
        loggedOnUser: {...state.users.loggedOnUser}
    }
}

export default connect(mapStateToProps)(CommentSection);