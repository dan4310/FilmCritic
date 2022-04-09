import './layout.css';
import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const Layout = ({ className, style, children }) => {
    return <div className={className + ' layout-component-container'} style={style}>
        {children}
    </div>
}

export default Layout;