import { useEffect } from 'react';
import './page.css';

const Page = ({ children, className, style, flush, center }) => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    return <div className={'page-component-container' + (flush ? '-flush ' : ' ') + className} style={{
        display: center ? 'flex' : '',
        alignItems: center ? 'center' : '',
        justifyContent: center ? 'center' : '',
        ...style,
    }}>
        {children}
    </div>
}

export default Page;