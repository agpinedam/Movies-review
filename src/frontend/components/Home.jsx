import React from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center font-sans">
            {/* Título */}
            <h1 className="text-blue-500 text-4xl font-semibold mt-8 mb-4 text-center">
                Welcome to  Movies Review
            </h1>
           {/* Subtítulo */}
           <p className="text-gray-700 text-lg mb-8 text-center">
                Connectez-vous ou créez un compte pour commencer
            </p>
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
