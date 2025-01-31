const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');

const router = express.Router();

// User registration route
router.post('/register', async (req, res) => {
    const { email, password, confirmPassword, name, surname, acceptTerms } = req.body;

    // Basic Validations
    if (!email || !password || !confirmPassword || !name || !surname || acceptTerms === false) {
        return res.status(400).json({ error: 'Veuillez remplir tous les champs obligatoires' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Les mots de passe ne correspondent pas' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Cette adresse e-mail est non valide' });
    }

    if (password.length < 8 || !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/.test(password)) {
        return res.status(400).json({
            error: 'Votre mot de passe doit contenir un chiffre, un caractère minuscule, un caractère majuscule et un caractère spécial.',
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            'INSERT INTO users (email, password, name, surname, accept_terms) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [email, hashedPassword, name, surname, acceptTerms]
        );

        res.status(201).json({ message: 'Utilisateur enregistré avec succès', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        if (error.code === '23505') {
            res.status(400).json({ error: 'Votre email existe déjà, veuillez vous connecter' });
        } else {
            res.status(500).json({ error: 'Erreur lors de l\'inscription' });
        }
    }
});

// user Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Veuillez remplir le champs sélectionné' });
    }

    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect, veuillez réessayer' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect, veuillez réessayer' });
        }

        // Devuelve todos los campos relevantes, incluyendo user_type
        res.status(200).json({
            message: 'Connexion réussie',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                surname: user.surname,
                about: user.about,
                photo: user.photo,
                phone: user.phone,
                address: user.address,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

module.exports = router;
