import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const MovieReview = () => {
  const [searchParams] = useSearchParams();
  const movieTitle = searchParams.get('title');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reviews?movie_title=${movieTitle}`);
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };
    
    fetchReviews();
  }, [movieTitle]);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold">Reviews for {movieTitle}</h1>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="border p-4 mt-2 rounded-lg shadow w-full max-w-md">
            <p className="text-lg font-semibold">{review.review}</p>
            <p className="text-yellow-500">{'⭐'.repeat(review.rating)}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default MovieReview;
