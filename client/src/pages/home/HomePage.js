import React, { useEffect, useState } from "react";
import TheMovieDB from "../../api/themovedb/TheMovieDB";
import './homePage.css';
import useQuery from "../../helpers/useQuery";
import MovieRow from "../../components/movie_row/MovieRow";
import Error from "../../components/error/Error";
import Carousel from "../../components/carousel/Carousel";
import Page from "../../components/page/Page";

const HomePage = ({ className, style }) => {
    const { data, loading, error } = useQuery(TheMovieDB.getMovieGenres());
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        if (data != null) {
            setGenres(data.genres);
        }
    }, [data])

    if (error) {
        return <Page><Error center className={className + " home-page"}>{error}</Error></Page>
    }

    return <Page flush className={className + ' home-page'} style={style}>
        <Carousel />
        <div className='home-body'>
            {genres.map(g => <MovieRow key={g.id} genre={g} />)}
        </div>
    </Page>
    
    
    
}

export default HomePage;