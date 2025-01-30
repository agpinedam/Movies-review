import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AddReview = () => {
  const [searchParams] = useSearchParams();
  const movieTitle = searchParams.get('title');
  const moviePoster = searchParams.get('poster');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);
  const navigate = useNavigate();

  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
        try {
            const response = await axios.post('/api/reviews', {
                movie_title: movieTitle,
                review,
                rating,
                user_id: user.id, // Se debe tomar el ID del usuario autenticado
            });
            navigate(`/profile/${user.id}`); // Redirige a la URL correcta con el ID del usuario
        } catch (err) {
            console.error('Error submitting review:', err);
        }
    };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold">Add Review for {movieTitle}</h1>
      <img src={moviePoster} alt={movieTitle} className="w-40 mt-4" />
      <textarea
        className="border w-full p-2 mt-4"
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <select
        className="border p-2 mt-2"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <option key={star} value={star}>
            {star} ⭐
          </option>
        ))}
      </select>
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 mt-4">
        Submit Review
      </button>
    </div>
  );
};

export default AddReview;
