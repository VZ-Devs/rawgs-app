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
  }

  // Initialize state variable named games and a function named setGames that can be used to update the value of games
  // const [games, setGames] = useState([])
  const [games, setGames] = useState<Array<Game>>([]);

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

  // Render the component
  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar placeholder='Search through RAWG database'/>
      </div>
      {/* Map over the `games` array and render an <h1> and <img> element for each game */}
      {games.map((game: Game) => (
        <div key={game.name}>
          <h2>{game.name}</h2>
          <img src={game.background_image} alt={game.name} />
        </div>
      ))}
      <button type="button">Add Game</button>
    </div>
  );
}

export default App;
