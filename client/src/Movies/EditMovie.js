import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditMovie = ({movieList, setMovieList}) => {
    const {id} = useParams();

    const [movie, setMovie] = useState();
    useEffect(() => {
        setMovie(movieList.filter(item => String(item.id) === id)[0]);
    }, [movieList, id])

    //const movie = movieList.filter(item => item.id === id)[0];

    if(!movie)
    {
        return (
            <div>Cannot find a movie with ID {id}.</div>
        )
    }

    return (
        <div className="movie-card">
            <h2>{movie.title}</h2>
            <div className="movie-director">
                Director: <em>{movie.director}</em>
            </div>
            <div className="movie-metascore">
                Metascore: <strong>{movie.metascore}</strong>
            </div>
            <h3>Actors</h3>

            {movie.stars.map(star => (
                <div key={star} className="movie-star">
                {star}
                </div>
            ))}
        </div>
    )
}

export default EditMovie;