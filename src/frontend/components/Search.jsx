import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1); // Current page number
  const [totalResults, setTotalResults] = useState(0); // Total results from the backend
  const [searchParams] = useSearchParams();

  // Fetch movies based on the query and page
  const handleSearch = async (searchTerm = query, pageNumber = 1) => {
    if (!searchTerm) {
      setError('Please enter a search term.');
      return;
    }

    try {
      setError('');
      const response = await axios.get('http://localhost:5000/search', {
        params: { query: searchTerm, page: pageNumber },
      });

      setMovies(response.data); // Update movies with the fetched results
      setTotalResults(response.data.length); // Update total results if needed
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
/* 
  // Handle pagination
  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    handleSearch(query, nextPage);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      const previousPage = page - 1;
      setPage(previousPage);
      handleSearch(query, previousPage);
    }
  }; */

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
          onClick={() => {
            setPage(1); // Reset to page 1 for new searches
            handleSearch();
          }}
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
                </li>
              ))}
            </ul>
        {/*     <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: page === 1 ? '#ccc' : '#007BFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#007BFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Next
              </button>
            </div> */}
          </>
        ) : (
          !error && <p>No movies found. Try a different search term.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
