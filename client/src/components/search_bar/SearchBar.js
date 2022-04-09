import { useEffect, useState } from 'react';
import './searchBar.css';

const SearchBar = ({ className, styles, children, setter }) => {
    const [query, setQuery] = useState('');
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        setter(query);
    }, [query]);

    function clear() {
        setQuery('');
    }

    return <div className={'search-input-container' + (isHidden ? '-hide' : '')}>
        <input className={'search-input' + (isHidden ? '-hide' : '')} placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className={'search-input-icon-left' + (isHidden ? '-hide' : '')} onClick={() => setIsHidden(!isHidden)}>
            <i className='fas fa-search'></i>
        </div>
        {query.length > 0 &&
            <div className={'search-input-icon-right' + (isHidden ? '-hide' : '')} onClick={() => clear()}>
                <i className='fas fa-times'></i>
            </div>
        }
    </div>
}

export default SearchBar;