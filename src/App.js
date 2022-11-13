import './App.css';
import { useState, useEffect } from 'react';
import SearchIcon from "./search.svg";
import MovieCard from './MovieCard';


const API_URL = "http://www.omdbapi.com/?apikey=26dc6eb6"
function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Batman');
  }, []);

  /* 
    const movie1 = {
      "Title": "Batman Begins",
      "Year": "2005",
      "imdbID": "tt0372784",
      "Type": "movie",
      //"Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
      "Poster" : "N/A"
    } */


  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className='search'>
        
        <input placeholder='Search for movies' value={searchTerm} onChange={(event) => {setSearchTerm(event.target.value) }} onKeyPress={(event) => {
          if (event.key === 'Enter'){
             searchMovies(searchTerm) 
          }
        }
        }/>

        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)}/>
      
      </div>

      {movies?.length > 0
        ? (
            <div className='container'>
              {movies.map((mov) => (
                <MovieCard movie={mov} />
              ))}
            </div>
          ) : (
            <div className='empty'>
              <h2>No Movies found</h2>
            </div>
          )}

    </div>
  );
}

export default App;
