import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const newMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: ["Joe Bloggs"],
}

const EditMovie = ({movieList, setMovieList}) => {
    const [movie, setMovie] = useState();
    const {id} = useParams();
    const history = useHistory();

    useEffect(() => {
        if(id){
            setMovie(movieList.filter(item => String(item.id) === id)[0]);
        }
        else {
            setMovie(newMovie);
        }
    }, [movieList, id])

    const filterIntoMovieList = movie => {
        setMovieList(
            movieList.map(item => {
                if(movie.id === item.id){ // if the item in movieList is the movie we're overwriting,
                    return movie; // overwrite it with new data
                }
                return item; // otherwise, pass it through unchanged
            })
        );
    }

    const handleChange = event => {
        const name = event.target.name;
        let value = event.target.value;
        if(name === "metascore"){
            value = Number(value);
            if(isNaN(value)){
                value = 0;
            }
        }
        //console.log(value);

        setMovie({...movie, [name]: value});
    }

    const handleSubmit = event => {
        event.preventDefault();

        //console.log(movie);

        if(id){
            Axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(response => {
                console.log(response);
                filterIntoMovieList(response.data);
                history.push(`/movies/${id}`);
            })
            .catch(error => console.log(error));    
        }
        else {
            Axios.post("http://localhost:5000/api/movies", movie)
            .then(response => {
                console.log(response);
                setMovieList(response.data);
                history.push(`/movies/${response.data[response.data.length-1].id}`);
            })
        }
    }

    if(!movie)
    {
        return (
            <div>Cannot find a movie with ID {id}.</div>
        )
    }

    return (
        <form className="movie-card" onSubmit={handleSubmit}>
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

            <button className="home-button">Save</button>
        </form>
    )
}

export default EditMovie;