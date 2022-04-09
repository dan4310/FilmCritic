import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addFormError, removeFormError, updateFormData } from '../../features/validation/validationSlice';
import './input.css';

const Input = ({ className, style, label, validate, type, form, validationErrors, name, isError, addError, removeError, updateData }) => {
    const [isHidden, setIsHidden] = useState(true);

    function onTextChange(value) {
        if (validate) {
            updateData(form, name, value);
            for (let i = 0; i < validate.length; i++) {
                var error = validate[i](value, label, name);
                if (error.message) {
                    addError({form, ...error});
                } else {
                    removeError({form, ...error});
                }
            }
        }
    }

    useEffect(() => {
        if (validate) {
            onTextChange('');
        }
    }, []);

    function renderValidIcon() {
        if (validate && isError) {
            return <div className="validation-info-container">
                
                <div className='input-error-container'>
                    <i className="fas fa-exclamation error-icon">
                        <span className='validation-info'>{validationErrors && validationErrors[0].message}</span>
                    </i>
                </div>
            </div>
        }
    }

    function renderPasswordIcon() {
        return <div className='toggle-visible-container' onClick={() => setIsHidden(!isHidden)}>
            <i className={'toggle-visible-icon ' + (isHidden ? 'fas fa-eye' : 'fas fa-eye-slash')}></i>
        </div>
    }

    return <div className={`input-component ${className}`} style={style}>
        <div className='label-container'>
            <h3 className='label'>{label}</h3>
        </div>
        <div className='input-container'>
            {type==='password' &&
                renderPasswordIcon()
            }
            <input type={type === 'password' ? (isHidden ? type : 'text') : type} className={'input' + (type==='password' ? '-password' : '')} onChange={(e) => onTextChange(e.target.value)} />
            {validate && renderValidIcon()}
        </div>
    </div>
}

function mapStateToProps(state, props) {
    const { validation } = state;
    if (!props.form) {
        return {validationErrors: [], isError: true};
    }
    var validationErrors = validation[props.form].errors[props.name];
    if (!validationErrors) {
        validationErrors = [];
    }
    return {
        validationErrors,
        isError: validationErrors.length > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addError: (error) => {dispatch(addFormError(error))},
        removeError: (error) => {dispatch(removeFormError(error))},
        updateData: (form, name, value) => dispatch(updateFormData({form, name, value}))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Input);
