import React, { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword || !name || !surname || !acceptTerms) {
            setMessage('Veuillez remplir tous les champs');
            setIsSuccess(false);
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Les mots de passe ne correspondent pas');
            setIsSuccess(false);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage('Cette adresse e-mail est non valide');
            setIsSuccess(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, confirmPassword, name, surname, acceptTerms }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Inscription réussie');
                setIsSuccess(true);
            } else {
                setMessage(data.error);
                setIsSuccess(false);
            }
        } catch (error) {
            setMessage('Erreur de connexion au serveur');
            setIsSuccess(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Inscription</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Nom</label>
                        <input
                            type="text"
                            placeholder="Entrez votre nom"
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-blue-500"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Prénom</label>
                        <input
                            type="text"
                            placeholder="Entrez votre prénom"
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Entrez votre email"
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Mot de passe</label>
                        <input
                            type="password"
                            placeholder="Entrez votre mot de passe"
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Confirmez votre mot de passe</label>
                        <input
                            type="password"
                            placeholder="Confirmez votre mot de passe"
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-blue-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                        />
                        <label className="text-gray-700">Accepter les conditions d'utilisation</label>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
                    >
                        S'inscrire
                    </button>
                </form>
                {message && (
                    <p className={`${isSuccess ? 'text-green-500' : 'text-red-500'} mt-4 text-center`}>{message}</p>
                )}
            </div>
        </div>
    );
};

export default Register;
