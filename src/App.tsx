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
  const [title, setTitle] = useState('Popular Games');
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
    setTitle(search);
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
      <div className="logo">logo</div>
      <div className="search-bar-container">
        <SearchBar
          placeholder="Search through RAWG database"
          onSearch={handleSearch}
        />
      </div>
      <div className="nav">
        <h1>Home</h1>
        <h1>All Games</h1>
        <h1>nav</h1>
      </div>

      <div className="container">
        <div className="pageHeader">
          {(searchResults.length > 0 ? <h1 className="pageTitle">Search: {title}</h1> : 
            <h1 className="pageTitle">{title}</h1>)}
        </div>
        {/* Map over the `games` array and render a card for each game */}
        <div className="cardGrid">
          {(searchResults.length > 0 ? searchResults : games).map(
            (game: Game) => (
                <div className="card" key={game.name}>
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="card-image"
                  />
                  <div className="card-content">
                    <h2 className="card-title">{game.name}</h2>
                    <p className="card-body">Release Date: {game.released}</p>
                    <p className="card-body">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Fugiat rem facilis.
                    </p>
                    <p className="card-body">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Fugiat rem facilis.
                    </p>
                    <a href="#" className="button">
                      Show more games like this
                    </a>
                  </div>
                </div>
            )
          )}
        </div>
        {/* <button type="button">Add Game</button> */}
      </div>
    </div>
  );
}

export default App;
