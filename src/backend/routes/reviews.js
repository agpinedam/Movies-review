const express = require('express');
const router = express.Router();
const db = require('../db');

// Agregar una reseña
router.post('/', async (req, res) => {
  const { user_id, movie_title, review, rating } = req.body;

  if (!user_id || !movie_title || !review || !rating) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO review (user_id, movie_title, review, rating) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, movie_title, review, rating]
    );
    res.status(201).json(result.rows[0]); // Devuelve el nuevo registro creado
  } catch (error) {
    console.error('Error inserting review:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  let { user_id } = req.query;

  console.log("Fetching reviews for user_id:", user_id); // LOG PARA DEPURACIÓN

  // Validar y convertir user_id a número
  user_id = parseInt(user_id, 10);
  if (isNaN(user_id)) {
    return res.status(400).json({ error: 'Invalid or missing User ID' });
  }

  try {
    const result = await db.query(
      'SELECT * FROM review WHERE user_id = $1',
      [user_id]
    );

    console.log("Query result:", result.rows); // LOG PARA DEPURACIÓN

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this user' });
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
