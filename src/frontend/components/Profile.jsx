import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    if (!user) {
        return <p className="text-gray-700 text-lg">Chargement...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Profil utilisateur</h2>
                {/* General fileds */}
                <p className="text-gray-700 mb-4">
                    <strong>À propos:</strong> {user.about || 'Non renseigné'}
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>Email:</strong> {user.email || 'Non renseigné'}
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>Photo:</strong>{' '}
                    {user.photo ? (
                        <img src={user.photo} alt="Photo de profil" className="w-20 h-20 rounded-full" />
                    ) : (
                        'Non renseigné'
                    )}
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>Numéro de téléphone:</strong> {user.phone || 'Non renseigné'}
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>Adresse:</strong> {user.address || 'Non renseigné'}
                </p>

                {/* Botón para editar */}
                <button
                    onClick={() => navigate('/edit-profile')}
                    className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
                >
                    Éditer le profil
                </button>

                
            </div>
        </div>
    );
};

export default Profile;