import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditMovie = ({movieList, setMovieList}) => {
    const {id} = useParams();

    const [movie, setMovie] = useState();
    useEffect(() => {
        setMovie(movieList.filter(item => String(item.id) === id)[0]);
    }, [movieList, id])

    const handleChange = event => {
        const name = [event.target.name];
        let value = [event.target.value];
        if(name === "metascore"){
            value = Number(value);
        }

        setMovie({...movie, [name]: value});
    }

    if(!movie)
    {
        return (
            <div>Cannot find a movie with ID {id}.</div>
        )
    }

    return (
        <form className="movie-card">
            <label className="large">
                Title
                <input type="text" name="title" value={movie.title} onChange={handleChange} />
            </label>
            <br />
            <label>
                Director
                <input type="text" name="director" value={movie.director} onChange={handleChange} />
            </label>
            <br />
            <label>
                Metascore
                <input type="text" name="metascore" value={movie.metascore} onChange={handleChange} />
            </label>
            <h3>Actors</h3>

            {movie.stars.map(star => (
                <div key={star} className="movie-star">
                {star}
                </div>
            ))}

            <br />

            <button className="home-button">Push Me</button>
        </form>
    )
}

export default EditMovie;