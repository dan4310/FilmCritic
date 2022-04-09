import { useEffect, useState } from 'react';
import './loader.css';

const Loader = ({ className, style, error }) => {
    
    return <div className={className + ' loader-container'} style={style}>
        <div className='loader'></div>
    </div>
}

export default Loader;