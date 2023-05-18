// Import necessary dependencies
import './App.css';
import { useEffect, useState } from 'react';
import { SearchBar } from './components/SearchBar';
const apiKey = process.env.VITE_RAWG_API_KEY;
const rawgURL = 'https://api.rawg.io';

function App() {
  interface Game {
    background_image: string;
    name: string;
    released: string;
  }

  // Initialize state variable named games and a function named setGames that can be used to update the value of games
  // const [games, setGames] = useState([])
  const [games, setGames] = useState<Array<Game>>([]);
  const [searchResults, setSearchResults] = useState<Array<Game>>([]);

  // Define an async function to fetch data and update the state
  const fetchData = async () => {
    try {
      // Make a GET request to the API endpoint
      const response = await fetch(`${rawgURL}/api/games?key=${apiKey}&page=2`);
      // Parse the response data as JSON
      const json = await response.json();
      // Update the state variable `games` with the fetched data
      setGames(json.results);
    } catch (error) {
      // Log any errors that occur during the fetch
      console.log('error', error);
    }
  };

  // Use the `useEffect` hook to fetch data from rawg API when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (search: string) => {
    fetch(
      `${rawgURL}/api/games?key=${apiKey}&search=${search}&search_exact=true`
    )
      .then((response) => response.json())
      .then((json) => {
        setSearchResults(json.results);
      });
  };

  // Render the component
  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar
          placeholder="Search through RAWG database"
          onSearch={handleSearch}
        />
      </div>
      <h1 className="pageTitle">Popular Games</h1>
      <ul className="cards">
        {/* Map over the `games` array and render an <h1> and <img> element for each game */}
        {(searchResults.length > 0 ? searchResults : games).map(
          (game: Game) => (
            <li key={game.name}>
              <a href="www.google.com" className="card">
                  <img src={game.background_image} alt={game.name} className="card__image"/>
                  <div className="card__overlay">
                    <div className="card__header">
                      <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                      <div className="card__header-text">
                        <h2 className="card__title">{game.name}</h2> 
                        <span className="card__status">(Platform icons)</span>
                      </div>
                    </div>
                    <p className="card__description">Release date: {game.released}</p>
                    <p className='card__description'>Genres: </p>
                    <p className='card__description'>Show more games like this</p>
                  </div>
              </a>
            </li>
          )
        )}
      </ul>
      <button type="button">Add Game</button>
    </div>
  );
}

export default App;
