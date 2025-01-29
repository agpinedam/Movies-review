import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center font-sans">
            {/* Título */}
            <h1 className="text-blue-500 text-4xl font-semibold mt-8 mb-4 text-center">
                Welcome to Movies Review
            </h1>
            {/* Subtítulo */}
            <p className="text-gray-700 text-lg mb-8 text-center">
                Connectez-vous ou créez un compte pour commencer
            </p>
            {/* Input and Search */}
            <div className="flex flex-col items-center gap-4 mb-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un film..."
                    className="border border-gray-300 px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                >
                    Rechercher un film
                </button>
            </div>
            {/* Botones */}
            <div className="flex gap-6 mb-12">
                <button
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                    onClick={() => navigate('/login')}
                >
                    Connexion
                </button>
                <button
                    className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-500 transition duration-300"
                    onClick={() => navigate('/register')}
                >
                    Inscription
                </button>

            </div>
        </div>
    );
};

export default Home;
