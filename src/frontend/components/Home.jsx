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
           
        </div>
    );
};

export default Home;
