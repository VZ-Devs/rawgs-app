// Import necessary dependencies
import './App.css';
import { useEffect, useState } from 'react';
import { SearchBar } from './components/SearchBar';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { faN } from '@fortawesome/free-solid-svg-icons';
import { faPlaystation, faSteam, faXbox } from '@fortawesome/free-brands-svg-icons';

const apiKey = process.env.VITE_RAWG_API_KEY;
const rawgURL = 'https://api.rawg.io';

function Pagination(count: number, next: string, previous: string) {
  const pageList = [];
  for (let i = 1; i <= Math.ceil(count / 20); i++) {
    pageList.push(<li key={i}>{i}</li>);
  }
  return <div>{pageList}</div>;
}

function App() {
  
  interface Game {
    background_image: string;
    name: string;
    released: string;
    id: number;
    genres: Genre[];
    stores: Store[];
  }

  interface PaginationInfo {
    count: number;
    next: string;
    previous: string;
  }

  interface Genre {
    id: number;
    name: string;
    slug: string;
  }

  interface Store {
    store: {
      id: number;
      name: string;
      slug: string;
    };
  }

  // Initialize state variable named games and a function named setGames that can be used to update the value of games
  // const [games, setGames] = useState([])
  const [title, setTitle] = useState('New and Trending');
  const [games, setGames] = useState<Array<Game>>([]);
  const [searchResults, setSearchResults] = useState<Array<Game>>([]);
  const [pages, setPages] = useState<PaginationInfo>({
    count: 0,
    next: '',
    previous: '',
  });

  // Define an async function to fetch data and update the state
  const fetchData = async () => {
    try {
      // Make a GET request to the API endpoint
      const response = await fetch(
        `${rawgURL}/api/games?key=${apiKey}&dates=2023-03-01,2023-05-18&platforms=18,1,7`
      );
      // Parse the response data as JSON
      const json = await response.json();
      // Update the state variable `games` with the fetched data
      setPages(json);
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
        setPages(json);
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
      <div className="navBar">
        <p>
          <a href="#" className="navButton">
            Home
          </a>
        </p>
        <p>
          <a href="#" className="navButton">
            All Games
          </a>
        </p>
        <p>
          <a href="#" className="navButton">
            More
          </a>
        </p>
      </div>
      <div className="container">
        <div className="pageHeader">
          {searchResults.length > 0 ? (
            <h1 className="pageTitle">Search: {title}</h1>
          ) : (
            <h1 className="pageTitle">{title}</h1>
          )}
        </div>
        <div className="dropDown">
          <select name="cars" id="cars">
            <option value="Relevance">Relevance</option>
            <option value="Date Added">Date Added</option>
            <option value="Name">Name</option>
            <option value="Release Date">Release Date</option>
            <option value="Popularity">Popularity</option>
            <option value="Average Rating">Average Rating</option>
          </select>
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
                <div className="store-icon-container">
                  {game.stores != null ? game.stores.map((store: Store) =>
                    store.store.name === 'PlayStation Store' ? (
                      <FontAwesomeIcon className="store-icon" key={store.store.name} icon={faPlaystation} size='lg' />
                    ) : store.store.name === 'Steam' ? (
                      <FontAwesomeIcon className="store-icon" key={store.store.name} icon={faSteam} size="lg" />
                    ) : store.store.name === 'Nintendo Store' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 22 22"><path fill="currentColor" d="M0 .6h7.1l9.85 15.9V.6H24v22.8h-7.04L7.06 7.5v15.9H0V.6"/></svg>
                    ) : store.store.name === 'Xbox Store' ? (
                      <FontAwesomeIcon className="store-icon" key={store.store.name} icon={faXbox} style={{color: "#ffffff",}} />
                    ) : null
                  ) : null}
                </div>
                <div className="card-title-container">
                  <a
                    href={rawgURL + '/api/games/' + game.id + '?key=' + apiKey}
                    className="card-title"
                  >
                    {game.name}
                  </a>
                </div>
                <div className="card-content">
                  <p className="card-body">Release Date: {game.released}</p>
                  <p>Genres:</p>
                  <ul className="card-body">
                    {game.genres.map((genre: Genre) => (
                      <li key={genre.name}>{genre.name}</li>
                    ))}
                  </ul>
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
        {/* {Pagination(pages.count, pages.next, pages.previous)} */}
      </div>
    </div>
  );
}

export default App;
