import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Fetch movies based on the query and page
  const handleSearch = async (searchTerm = query, pageNumber = 1) => {
    if (!searchTerm) {
      setError('Please enter a search term.');
      return;
    }

    try {
      setError('');
      const response = await axios.get('http://localhost:5000/search', {
        params: { query: searchTerm },
      });

      setMovies(response.data); // Update movies with the fetched results bug
      //setTotalResults(response.data.length); // Update total results if needed
    } catch (err) {
      console.error('Error fetching movies:', err.message);
      setError(
        err.response?.data?.error || 'An error occurred while fetching movies.'
      );
      setMovies([]);
    }
  };

  // Load the initial query from the URL
  useEffect(() => {
    const queryFromUrl = searchParams.get('query');
    if (queryFromUrl) {
      setQuery(queryFromUrl);
      handleSearch(queryFromUrl);
    }
  }, [searchParams]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Search for Movies</h1>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title"
          style={{
            padding: '10px',
            width: '300px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <button
          onClick={() => handleSearch()}
          style={{
            marginLeft: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {movies.length > 0 ? (
          <>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {movies.map((movie) => (
                <li
                  key={movie.imdbID}
                  style={{
                    marginBottom: '20px',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <h2 style={{ margin: 0 }}>{movie.Title}</h2>
                  <p style={{ margin: 0 }}>Year: {movie.Year}</p>
                  {movie.poster !== 'N/A' && (
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      style={{ width: '100px', marginTop: '10px' }}
                    />
                  )}
              <button
                  onClick={() => navigate(`/add-review?title=${movie.Title}&poster=${movie.Poster}`)}
                  style={{
                    marginTop: '10px',
                    padding: '10px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Add Review
                </button>
              </li>
              ))}
            </ul>
          </>
        ) : (
          !error && <p>No movies found. Try a different search term.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
