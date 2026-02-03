import { createContext, useContext, useEffect, useState } from "react";


const MovieContext = createContext();

export const useMovieContext = ()=> useContext(MovieContext);

export const Movieprovider = ({children}) => {
    const[favourite, setFavourite] = useState([]);

    useEffect(()=>{
        const stored = localStorage.getItem('favourite');
        if(stored) setFavourite(JSON.parse(stored));
    },[])

    useEffect(()=>{
        localStorage.setItem('favourite', JSON.stringify(favourite));
    },[favourite])

    const addToFavourite = (movie)=>{
        setFavourite(prev=>[...prev,movie])
    }

    const removeFromFavourite = (movieId)=>{
        setFavourite (prev=> prev.filter((movie)=> movie.id !== movieId));
    }

    const isFavourite = (movieId)=>{
        return favourite.some((movie)=> movie.id === movieId);
    }
    const value = {
        favourite,
        addToFavourite,
        removeFromFavourite,
        isFavourite
    }

    return(
        <MovieContext.Provider value = {value}>
            {children}
        </MovieContext.Provider>
    )
}