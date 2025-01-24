const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    // Validar que `id` sea un número entero
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ error: 'ID invalide. Veuillez fournir un identifiant numérique.' });
    }

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



// Editar perfil de usuario
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        await db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
        res.status(200).json({ message: 'Perfil actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
});

module.exports = router;
