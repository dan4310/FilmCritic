import Page from '../../components/page/Page';
import './profilePage.css';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { filmCriticApi } from '../../services/filmCritic';
import { useEffect, useState } from 'react';
import { setUser } from '../../features/user/userSlice';
import Review from '../../components/review/Review';

const ProfilePage = ({ className, style, loggedOnUser, logOutUser }) => {
    const { username } = useParams();
    const [filteredReviews, setFilteredReviews] = useState();

    const { data, isLoading, error } = filmCriticApi.useGetUserProfileQuery(username);
    useEffect(() => {
        if (data) {
            setFilteredReviews(data.reviews);
        }
    }, [data])
    const [logout, { data: logoutData, isLoading: isLogoutLoading }] = filmCriticApi.useLogOutMutation();

    useEffect(() => {
        if (logoutData) {
            logOutUser();
        }
    }, [logoutData]);

    function renderInfo() {
        if (isLoading) {
            return <p>Loading...</p>
        }
        if (data) {
            return <>
                <div className='name-info'>
                    <h1 className='profile-name'>{data.user.firstName + " " + data.user.lastName}</h1>
                    <div className='username-info'>
                        <h2 className='profile-username'>{`@${data.user.username}`}</h2>
                        { loggedOnUser.userId === data.user.userId &&
                            <button disabled={isLogoutLoading} onClick={() => logout()}>
                                <span className='sign-out-text'>Sign out</span>
                            </button>
                        }
                    </div>
                </div>
                <div className='my-reviews-container'>
                    <div className='my-reviews-header'>
                        <button className='btn-1'>
                            <p>{`${data.reviews?.filter(r => r.isShow === 0).length} Movie review${data.reviews?.filter(r => r.isShow === 0).length === 1 ? '' : 's'}`}</p>
                        </button>
                        <button className='btn-2'>
                            <p>{`${data.reviews?.length} Total review${data.reviews?.length === 1 ? '' : 's'}`}</p>
                        </button>
                        <button className='btn-3'>
                            <p>{`${data.reviews?.filter(r => r.isShow === 1).length} Show review${data.reviews?.filter(r => r.isShow === 1).length === 1 ? '' : 's'}`}</p>
                        </button>
                    </div>
                    <div className='review-list'>
                        {
                            filteredReviews?.map(r => <Review key={r.reviewId} review={r} />)
                        }
                    </div>
                </div>
            </>
        }
    }

    return <Page className={`profile-page layout-3panel ${className}`} style={style}>
        <div className='left-panel'></div>
        <div className='center-panel'>
            {renderInfo()}
        </div>
        <div className='right-panel'></div>
    </Page>
}

function mapStateToProps(state) {
    return {
        loggedOnUser: {...state.users.loggedOnUser}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logOutUser: () => dispatch(setUser({}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);