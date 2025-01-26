const express = require('express');
const router = express.Router();
const axios = require('axios');

// Replace with your actual OMDB API key
const OMDB_API_KEY = '34747f41';

// Search movies route
router.get('/', async (req, res) => {
  const { query } = req.query; // The search query sent by the client
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    // Call the OMDB API
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: OMDB_API_KEY,
        s: query, // 's' is the search parameter for movies
        
      },
    });

    // Check if OMDB returned any results
    if (response.data.Response === 'False') {
      return res.status(404).json({ error: response.data.Error });
    }

    // Send the results back to the client
    res.json(response.data.Search);
  } catch (error) {
    console.error('Error fetching data from OMDB API:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching data from OMDB' });
  }
});

module.exports = router;
