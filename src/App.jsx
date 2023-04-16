import Grid from "./components/Grid/Grid";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import "./index.css";
import { useState, useEffect } from "react";

import { ACCESS_KEY } from "./utils/consts";
import Photo from "./components/Photo/Photo";

function App() {
  // Setting State for search query
  const [searchQuery, setSearchQuery] = useState("");
  // Setting state for search result
  const [searchResults, setSearchResults] = useState([]);

  // Fetching pics

  useEffect(() => {
    if (searchQuery !== "" || !searchQuery.length) {
      fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=10`,
        {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setSearchResults(data.results))
        .catch((error) => console.log(error));
    }
  }, [searchQuery]);

  // Preventing unnecessary API requests when the user is typing

  const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Handling Search with debounce

  const handleSearch = debounce((e) => {
    setSearchQuery(e.target.value);
  }, 500);

  const results = searchResults.map((result) => (
    <Photo
      key={result.id}
      id={result.id}
      src={result.urls.regular}
      alt={result.alt_description}
    />
  ));

  return (
    <div className="App">
      <Header />
      <Hero>
        <div className="search__container">
          <input
            className="search"
            type="text"
            placeholder="Search for image..."
            onChange={handleSearch}
          />
        </div>
        {searchResults.length ? (
          <Grid>{searchResults && results}</Grid>
        ) : (
          <h1 style={{ textAlign: "center" }}>No results</h1>
        )}
      </Hero>
      <footer className="footer">
        <p>
          Made by{" "}
          <a
            className="credentials"
            href="https://github.com/rootfellen"
            target="_blank"
          >
            Serhii Tarasenko
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
