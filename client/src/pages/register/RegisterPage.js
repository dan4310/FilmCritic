import Page from '../../components/page/Page';
import './registerPage.css';
import { useEffect, useState } from 'react';
import Input from '../../components/input/Input';
import { isMatch, notEmpty } from '../../features/validation/validators';
import { addFormError, removeFormError } from '../../features/validation/validationSlice';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../services/filmCritic';
import { setUser } from '../../features/user/userSlice';

const RegisterPage = ({ className, style, canRegister, errors, newUser, addError, removeError, setUser }) => {
    const [register, { data, error, isLoading }] = useRegisterMutation();
    const navigate = useNavigate();

    const renderServerMessage = () => {
        if (error) {
            return <div className='server-error'><h3>{error.data.message}</h3></div>
        }
        if (isLoading) {
            return <div className='server-loading'><h3>Loading...</h3></div>
        }
        if (data) {
            return <div className='server-success'><h3>{`Registered as user '${data.firstName}'`}</h3></div>
        }
    }

    useEffect(() => {
        var error = isMatch(newUser.confirmPassword, newUser.password, "Confirm Password", "confirmPassword");
        if (error.message) {
            addError({form: 'registerForm', ...error});
        } else {
            removeError({form: 'registerForm', ...error});
        } 
    }, [newUser.confirmPassword, newUser.password]);

    useEffect(() => {
        if (data) {
            if (data) {
                setUser(data);
                navigate('../');
            } 
        }
    }, [data]);

    return <Page className={'register-page ' + className} style={style}>
        <div></div>
        <div className='register-form-container'>
            <h1>Welcome to the Critics Club!</h1>
            <div className="form-with-title">
                <h2>Register</h2>
                <form className='register-form container-round shadow'>
                        {renderServerMessage()}
                        <div className='row-1'>
                            <Input form='registerForm' name='firstName' validate={[notEmpty]} type='firstName' label="First Name" className='firstname-input' />
                            <Input form='registerForm' name='lastName' validate={[notEmpty]} type='lastName' label="Last Name" className='lastname-input' />
                        </div>
                        <div className='row-2'>
                            <Input form='registerForm' name='username' validate={[notEmpty]} type='username' label="Username" className='username-input' />
                            <Input form='registerForm' name='email' validate={[notEmpty]} type='email' label="Email" className='email-input' />
                        </div>
                        
                        <div className='row-3'>
                            <Input form='registerForm' name='password' validate={[notEmpty]} type='password' label="Password" className='password-input' />
                            <Input form='registerForm' name='confirmPassword' validate={[notEmpty]} type='password' label="Confirm Password" className='confirm-password-input' />
                        </div>
                        
                        <div className='form-footer'>
                            <button type="button" onClick={() => register(newUser)} disabled={!canRegister || isLoading} className='btn-large'>
                                <span className='btn-text'>Register</span>
                            </button>
                        </div>
                </form>
            </div>
            <h3>Already have an account? Sign in <Link to="/login" className='hidden-link here-txt'>here.</Link></h3>

        </div>
        <div></div>
    </Page>
}

function mapStateToProps(state) {
    const data = {
        errors: {...state.validation.registerForm.errors},
        newUser: {...state.validation.registerForm.formData},
    }
    return {
        canRegister: Object.keys(data.errors).length === 0,
        newUser: data.newUser,
        errors: data.errors,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addError: (error) => dispatch(addFormError(error)),
        removeError: (error) => dispatch(removeFormError(error)),
        setUser: (user) => dispatch(setUser(user)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);