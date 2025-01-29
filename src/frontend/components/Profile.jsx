import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const parsedUser = JSON.parse(userData);
            console.log("User ID from localStorage:", parsedUser.id);
            setUser(parsedUser);
            fetchReviews(parsedUser.id);
        }
    }, []);

    const fetchReviews = async (userId) => {
        try {
            userId = Number(userId);  // <-- Convierte a número
            console.log("Fetching reviews for user_id:", userId); // <-- DEBUG
            const response = await axios.get(`http://localhost:5000/reviews?user_id=${userId}`);
            console.log("Reviews received:", response.data); // <-- DEBUG
            setReviews(response.data);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    if (!user) {
        return <p className="text-gray-700 text-lg">Chargement...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Profil utilisateur</h2>
                <p className="text-gray-700 mb-4"><strong>À propos:</strong> {user.about || 'Non renseigné'}</p>
                <p className="text-gray-700 mb-4"><strong>Email:</strong> {user.email || 'Non renseigné'}</p>
                <p className="text-gray-700 mb-4"><strong>Photo:</strong> {user.photo ? <img src={user.photo} alt="Photo de profil" className="w-20 h-20 rounded-full" /> : 'Non renseigné'}</p>
                <p className="text-gray-700 mb-4"><strong>Numéro de téléphone:</strong> {user.phone || 'Non renseigné'}</p>
                <p className="text-gray-700 mb-4"><strong>Adresse:</strong> {user.address || 'Non renseigné'}</p>

                <button onClick={() => navigate('/edit-profile')} className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600">Éditer le profil</button>

                <div className="flex flex-col items-center gap-4 mt-4">
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Rechercher un film..." className="border border-gray-300 px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button onClick={handleSearch} className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300">Rechercher un film</button>
                </div>

                <h3 className="text-xl font-bold text-gray-700 mt-6">Your Reviews</h3>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="border p-4 mt-2 rounded-lg shadow">
                            <h4 className="font-bold">{review.movie_title}</h4>
                            <p>{review.review}</p>
                            <p className="text-yellow-500">{'⭐'.repeat(review.rating)}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
