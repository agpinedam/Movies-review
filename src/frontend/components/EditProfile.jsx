import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Get users
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const validateFields = () => {
        const newErrors = {};

        // Validate URL format for the photo field
        if (user.photo && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(user.photo)) {
            newErrors.photo = 'Le format de votre fichier n’est pas reconnu.';
        }

        return newErrors;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const validationErrors = validateFields();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const response = await fetch(`/api/profile/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Profil mis à jour avec succès');
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate(`/profile/${user.id}`)
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('Erreur lors de la mise à jour du profil');
        }
    };

    if (!user) {
        return <p className="text-gray-700 text-lg">Chargement...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Éditer le profil</h2>
                <form onSubmit={handleUpdate}>
                    {/* General fields */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">À propos</label>
                        <textarea
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-blue-500"
                            value={user.about || ''}
                            onChange={(e) => setUser({ ...user, about: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Photo (URL)</label>
                        <input
                            type="url"
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-blue-500"
                            value={user.photo || ''}
                            onChange={(e) => setUser({ ...user, photo: e.target.value })}
                        />
                        {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Numéro de téléphone</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-blue-500"
                            value={user.phone || ''}
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Adresse</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-blue-500"
                            value={user.address || ''}
                            onChange={(e) => setUser({ ...user, address: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
                    >
                        Mettre à jour
                    </button>
                </form>
                {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
            </div>
        </div>
    );
};

export default EditProfile;
