import { useState } from 'react';
import './badge.css';

const Badge = ({ className, style, children, onClick, disabled }) => {
    const [isActive, setIsActive] = useState(false);

    function clicked() {
        if (!disabled) {
            setIsActive(!isActive);
            onClick();
        }
    }

    if (onClick) {
        return <div className={'badge-container-clickable' + (isActive ? "-active" : '') + (disabled ? '-disabled ' : ' ') + className} style={style}
            onClick={() => clicked()}
        >
            <span className='badge'>{children}</span>
        </div>
    }

    return (
        <div className={'badge-container '+className} style={style}>
            <span className='badge'>{children}</span>
        </div>
    )
}

export default Badge;