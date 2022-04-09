import { useEffect, useState } from 'react';
import './rating.css';

const Rating = ({ className, style, children, size, text }) => {
    const [rating, setRating] = useState();

    useEffect(() => {
        if (children) {
            setRating(children);
        }
    }, [children])

    function getColor(score) {

        if (score > 8) {
            return 'green';
        } else if (score > 5) {
            return 'orange';
        } else {
            return 'red';
        }
    }

    if (text) {
        return <span className={`${className} `+ getColor(rating)}>{children ? rating : "N/A"}</span>
    }

    return <div className={className + " rating-container"+ (size ? `-${size}`: '')} style={style}>
        <span className={"rating-text" + (size ? `-${size}`: '') + " " + getColor(rating)}>
            {children ? rating : "N/A"}
        </span>
    </div>
}

export default Rating;