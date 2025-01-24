const express = require('express');
const db = require('../db');
const router = express.Router();

// Obtener perfil del usuario
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
    }
});

// Actualizar perfil del usuario
router.put('/:id', async (req, res) => {
    const {
        about,
        photo,
        phone,
        address,
    } = req.body;
    const { id } = req.params;

    try {
        const result = await db.query(
            `UPDATE users 
             SET about = $1, photo = $2, phone = $3, address = $4
             WHERE id = $5 RETURNING *`,
            [
                about,
                photo,
                phone,
                address,
                id,
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        res.status(200).json({ message: 'Profil mis à jour avec succès', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du profil' });
    }
});

module.exports = router;