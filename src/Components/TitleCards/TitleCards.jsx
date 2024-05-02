import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';
// import cards_data from '../../assets/cards/Cards_data'l
const TitleCards = ({ title, category }) => {
    // For movies list scroll Start
    const [apiData, setApiData] = useState([])
    const cardsRef = useRef();
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWU2YjVlMTRhMjc2ZTk1MDZhYjg4YjVjODAzMWY5OSIsInN1YiI6IjY2MmNjYjQxZTMzZjgzMDEyYjIwZmY0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zNvFzsHypd9sEjL4kfdbFHtszkLqeIxFHmEh793LlNk'
        }
    };
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
            .then(response => response.json())
            .then(response => setApiData(response.results))
            .catch(err => console.error(err));
        const handleWheel = (event) => {
            event.preventDefault();
            cardsRef.current.scrollLeft += event.deltaY;
        }
        cardsRef.current.addEventListener('wheel', handleWheel);
    }, [])
    // For movies list scroll end

    return (
        <div className='titlecards'>
            <h2>{title ? title : "Popular on Netflix"}</h2>
            <div className='card-list' ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className='card' key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path} alt='' />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default TitleCards
