import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard";
import '../css/Home.css';
import {getPopularMovies, searchMovie} from "../services/api";

function Home(){
    const[searchQuery, setSearchQuery]= useState('')
    const [movie, setMovie]= useState([]);
    const [error, setError]= useState(null);
    const [loading,setLoading]= useState(true);

    useEffect(()=>{
        const loadPopularMovie = async()=>{
            try{
                const popularMovie = await getPopularMovies();
                setMovie(popularMovie);
            }
            catch(err){
                console.log(err);
                setError('failed to load the movies');
            }
            finally{
                setLoading(false);
            }
            
        }
        loadPopularMovie();
    },[])

    const handleSearch = async (e)=>{
        e.preventDefault();
        if(!searchQuery.trim()) return;
        if(loading) return;
        setLoading (true);
        try{
            const searchResult = await searchMovie(searchQuery);
            setMovie (searchResult);
            setError (null);
        } catch(err){
            console.log(err);
            setError('failed to search for the movie....')
        } finally{
            setLoading(false);
        }


    }

    return (<div className="home">
            <form className="search-form" onSubmit={handleSearch}>
                <input type="text"
                 placeholder= 'Search for the movies' 
                 className="search-input"
                 value={searchQuery}
                 onChange={(e)=>setSearchQuery(e.target.value)}/>
                <button type= 'submit' className="search-button">Search</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {loading ? (<div className="loading">Loading</div>):<div className="movies-grid" display="grid">
                {movie.map((movie)=>(
                     <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>}
            
    </div>)
}

export default Home