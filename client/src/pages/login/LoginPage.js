import Input from '../../components/input/Input';
import Page from '../../components/page/Page';
import { notEmpty } from '../../features/validation/validators';
import { connect, connectAdvanced } from 'react-redux';
import './loginPage.css';
import { Link } from 'react-router-dom';
import useLazyQuery from '../../helpers/useLazyQuery';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setUser } from '../../features/user/userSlice';
import { filmCriticApi } from '../../services/filmCritic';

const LoginPage = ({ className, style, userLogin, canLogin, errors, setUser }) => {
    const [login, { data, error, isLoading }] = filmCriticApi.useLoginMutation();
    const navigate = useNavigate();

    function onLogin() {
        setUser({});
        login(userLogin);
    }
    useEffect(() => {
        if (data) {
            if (data.hasOwnProperty('username')) {
                setUser(data);
                navigate('../');
            } 
        }
    }, [data]);

    const renderServerMessage = () => {
        if (error) {
            return <div className='server-error'><h3>{error.data.message}</h3></div>;
        }
        if (isLoading) {
            return <div className='server-loading'><h3>Loading...</h3></div>
        }
        if (data) {
            return <div className='server-success'><h3>{`Logged in as user '${data.username}'`}</h3></div>
        }
    }

    return <Page className={className + " login-page"} style={style}>
        <div></div>
        <div className='login-form-container'>
            <h1>Welcome back!</h1>
            <div className='form-with-title'>
                <h2>Sign In</h2>
                <form className='login-form container-round shadow'>
                    {renderServerMessage()}
                    <Input form="loginForm" name="username" validate={[notEmpty]} label="Username" type="username" />
                    <Input form="loginForm" name="password" validate={[notEmpty]} label="Password" type="password" />
                    <div className='form-footer'>
                        <button type='button' disabled={!canLogin || isLoading} className='btn-large' onClick={() => onLogin()}>
                            <span className='btn-text'>Login</span>
                        </button>
                    </div>
                </form>
            </div>
            <h3>Don't have an account? Become a critic <Link to='/register' className='here-txt hidden-link'>here</Link></h3>
        </div>
        <div></div>
    </Page>
}

function mapStateToProps(state) {
    const data = {
        errors: {...state.validation.loginForm.errors},
        userLogin: {...state.validation.loginForm.formData}
    }
    return {
        canLogin: Object.keys(data.errors).length === 0,
        userLogin: data.userLogin,
        errors: data.errors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setUser: (user) => dispatch(setUser(user)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);