const request = require('supertest');
const app = require('../index');
const db = require('../db');

jest.mock('../db'); // Mock data base

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
    console.error.mockRestore();
});
describe('Pruebas para rutas de perfil', () => {

    describe('GET /api/profile/:id', () => {
        it("should return the user's profile if the ID exists", async () => {
            db.query.mockResolvedValueOnce({
                rows: [
                    {
                        id: 1,
                        about: 'Sobre mí',
                        photo: 'https://example.com/photo.jpg',
                        phone: '123456789',
                        address: '123 Calle Ejemplo',
                    },
                ],
            });

            const response = await request(app).get('/api/profile/1');

            expect(response.statusCode).toBe(200);
            expect(response.body.user).toMatchObject({
                id: 1,
                about: 'Sobre mí',
                photo: 'https://example.com/photo.jpg',
            });
        });

        it('should return a 404 error if the user does not exist.', async () => {
            db.query.mockResolvedValueOnce({ rows: [] });

            const response = await request(app).get('/api/profile/99');

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Utilisateur non trouvé');
        });

        it('should return a 500 error if a database problem occurs.', async () => {
            db.query.mockRejectedValueOnce(new Error('Database error'));

            const response = await request(app).get('/api/profile/1');

            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty('error', 'Erreur lors de la récupération du profil');
        });
    });

    describe('PUT /api/profile/:id', () => {
        it("you must update the user's profile and return the updated data", async () => {
            db.query.mockResolvedValueOnce({
                rows: [
                    {
                        id: 1,
                        about: 'Información actualizada',
                        photo: 'https://example.com/updated-photo.jpg',
                        phone: '987654321',
                        address: '456 Calle Actualizada',
                    },
                ],
            });

            const response = await request(app)
                .put('/api/profile/1')
                .send({
                    about: 'Información actualizada',
                    photo: 'https://example.com/updated-photo.jpg',
                    phone: '987654321',
                    address: '456 Calle Actualizada',
                });

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Profil mis à jour avec succès');
            expect(response.body.user).toMatchObject({
                about: 'Información actualizada',
                photo: 'https://example.com/updated-photo.jpg',
            });
        });

        it('should return a 404 error if the user does not exist', async () => {
            db.query.mockResolvedValueOnce({ rows: [] });

            const response = await request(app)
                .put('/api/profile/99')
                .send({
                    about: 'Información actualizada',
                    photo: 'https://example.com/updated-photo.jpg',
                    phone: '987654321',
                    address: '456 Calle Actualizada',
                });

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('error', 'Utilisateur non trouvé');
        });

        it('should return a 500 error if a database problem occurs', async () => {
            db.query.mockRejectedValueOnce(new Error('Database error'));

            const response = await request(app)
                .put('/api/profile/1')
                .send({
                    about: 'Información actualizada',
                    photo: 'https://example.com/updated-photo.jpg',
                    phone: '987654321',
                    address: '456 Calle Actualizada',
                });

            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty('error', 'Erreur lors de la mise à jour du profil');
        });
    });
});
