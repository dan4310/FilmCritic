import './comment.css';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const Comment = ({ className, style, loggedOnUser, comment }) => {
    return (<div className={`comment-container ${className}`} style={style}>
        <div className='comment-header'>
            <Link className='hidden-link' to={`/profile/${comment.user.username}`}>
                <div className='user-info'>
                    <span className='review-first-name'>{comment.user.firstName + " " + comment.user.lastName}</span>
                    <span className="review-username">{'@'+comment.user.username}</span>
                </div>
            </Link>
            <Moment className='timestamp' format='M/D/YYYY \at H:MM A'>{comment.create}</Moment>
        </div>
        <div className='comment-body'>
            <p>{comment.text}</p>
        </div>
        <div className='comment-footer'>
        </div>
    </div>
    )
}

function mapStateToProps(state) {
    return {
        loggedOnUser: {...state.users.loggedOnUser}
    }
}
export default connect(mapStateToProps)(Comment);