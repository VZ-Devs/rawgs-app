// Import necessary dependencies
import './App.css';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { SearchBar } from './components/SearchBar';
import Home from './pages/home/Home';
import Games from './pages/home/Games';

const apiKey = process.env.VITE_RAWG_API_KEY;
const rawgURL = 'https://api.rawg.io';

function App() {
  const [title, setTitle] = useState('New and Trending');
  const [searchResults, setSearchResults] = useState<Array<Game>>([]);
  const [searchString, setSearchString] = useState('');
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const [searchUrl, setUrl] = useState('');
  const [next, setNext] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

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
      domain: string;
    };
  }

  // Render the component
  const handleSearch = (search: string) => {
    setTitle(search);
    setPageNumber(1); // Reset the page number to 1 when performing a new search
    fetch(
      `${rawgURL}/api/games?key=${apiKey}&search=${search}&page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((json) => {
        setSearchResults(json.results);
        setSearchString(search);
        setIsSearchComplete(true);
        setNext(json.next);
        setUrl(
          `${rawgURL}/api/games?key=${apiKey}&search=${search}&page=${pageNumber}`
        );
      });
  };

  // Function to handle pagination
  const handlePagination = () => {
    if (next) {
      fetch(next)
        .then((response) => response.json())
        .then((json) => {
          setSearchResults(json.results);
          setNext(json.next);
          setUrl(json.next);
          setPageNumber(pageNumber + 1); // Increment the page number for the next page
        });
    }
  };

  const handleHomeButton = () => {
    setSearchResults([]); // Set searchResults to an empty array
    setTitle('New and Trending');
    setSearchString('');
    setIsSearchComplete(false);
    setUrl('');
    setPageNumber(1);
    
  };

  const handleAllGames = () => {
    setSearchResults([]); // Set searchResults to an empty array
    setTitle('All Games');
    setSearchString('');
    setIsSearchComplete(false);
    setUrl('');
    setPageNumber(1);
  }

  return (
    <div className="App">
      <div className="logo">logo</div>
      <div className="search-bar-container">
        <SearchBar
          placeholder="Search through RAWG database"
          onSearch={handleSearch}
        />
      </div>
      <nav className="navBar">
        <Link to="/" className="navButton" onClick={handleHomeButton}>
          Home
        </Link>
        <br />
        <Link to="/games" className="navButton" onClick={handleAllGames}>
          All Games
        </Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              title={title}
              searchResults={searchResults}
              searchString={searchString}
              isSearchComplete={isSearchComplete}
              searchUrl={searchUrl}
              next={next}
              pageNumber={pageNumber}
              handlePagination={handlePagination}
            />
          }
        />
        <Route
          path="/games"
          element={
            <Games
              title={'All Games'}
              searchResults={searchResults}
              searchString={searchString}
              isSearchComplete={isSearchComplete}
              searchUrl={searchUrl}
              next={next}
              pageNumber={pageNumber}
              handlePagination={handlePagination}
            />
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>404: Page Not Found</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat vitae
        debitis, rerum vel nemo placeat cumque quam libero beatae tempora unde
        at tempore quae iure autem rem obcaecati culpa? Iure?
      </p>
    </div>
  );
}

export default App;
