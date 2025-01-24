import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '../context/NavigationContext';

const Navigation = () => {
    const { navigate } = useNavigation();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-4">
                <h1
                    className="text-2xl font-bold cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    Split
                </h1>
                {location.pathname !== '/login' && location.pathname !== '/register' && (
                    <>
                        <button
                            onClick={() => navigate('/profile')}
                            className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200"
                        >
                            Profil
                        </button>
                        <button
                            onClick={() => navigate('/edit-profile')}
                            className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200"
                        >
                            Modifier Profil
                        </button>
                    </>
                )}
            </div>
            <div>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                    Déconnexion
                </button>
            </div>
        </nav>
    );
};

export default Navigation;
