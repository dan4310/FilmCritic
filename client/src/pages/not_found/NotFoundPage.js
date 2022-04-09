import './notFoundPage.css';
import Page from '../../components/page/Page';

const NotFoundPage = ({ className, style }) => {
    return <Page className={className + ' not-found-page'} style={style}>
        <div className='not-found-container'>
            <i className='fas fa-exclamation-triangle not-found-icon'></i>
            <h1>Page Not Found</h1>
        </div>     
    </Page>
}

export default NotFoundPage;