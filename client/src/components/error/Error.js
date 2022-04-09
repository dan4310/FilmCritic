import { useEffect } from 'react';
import './error.css';

const Error = ({ className, style, children, size }) => {
    return <div className={className + ' error-container'} style={style}>
        <i className={"fas fa-exclamation-triangle error-icon" + (size ? "-"+size : '')}></i>
        <span className={"error-text" + (size ? "-"+size : '')}>{children.message}</span>
    </div>
}

export default Error;