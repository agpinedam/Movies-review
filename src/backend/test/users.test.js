const request = require('supertest');
const app = require('../index');
const db = require('../db');

jest.mock('../db');

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
    console.error.mockRestore();
});

describe('GET /api/users/:id', () => {
    it('must return a 400 error if the ID is not numeric', async () => {
        const response = await request(app).get('/api/users/abc');
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'ID invalide. Veuillez fournir un identifiant numérique.');
    });

    it('should return the user if the ID exists', async () => {
        db.query.mockResolvedValueOnce({
            rows: [
                {
                    id: 1,
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                },
            ],
        });

        const response = await request(app).get('/api/users/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.user).toMatchObject({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
        });
    });

    it('should return a 404 error if the user does not exist', async () => {
        db.query.mockResolvedValueOnce({ rows: [] });

        const response = await request(app).get('/api/users/99');
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error', 'Utilisateur non trouvé');
    });

    it('should return a 500 error if a problem occurs in the database', async () => {
        db.query.mockRejectedValueOnce(new Error('Database error'));

        const response = await request(app).get('/api/users/1');
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('error', 'Erreur lors de la récupération du profil');
    });
});

describe('PUT /api/users/:id', () => {
    it('you must update the user profile correctly', async () => {
        db.query.mockResolvedValueOnce({});

        const response = await request(app)
            .put('/api/users/1')
            .send({
                name: 'Jane Doe',
                email: 'janedoe@example.com',
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Perfil actualizado exitosamente');
        expect(db.query).toHaveBeenCalledWith(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3',
            ['Jane Doe', 'janedoe@example.com', '1']
        );
    });

    it('should return a 500 error if a database problem occurs', async () => {
        db.query.mockRejectedValueOnce(new Error('Database error'));

        const response = await request(app)
            .put('/api/users/1')
            .send({
                name: 'Jane Doe',
                email: 'janedoe@example.com',
            });

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('error', 'Error al actualizar el perfil');
    });
});
