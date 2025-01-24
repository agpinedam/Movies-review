const request = require('supertest');
const app = require('../index'); 
const db = require('../db'); 
const bcrypt = require('bcrypt');

jest.mock('../db'); // Mock lthe database module
jest.mock('bcrypt'); // Mock bcrypt

beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Hide the console.error
});

afterAll(() => {
    console.error.mockRestore(); // Restore console.error after every test
});

describe('Authentication paths (auth)', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clean all mocks before every test
    });

    describe('POST /api/auth/register', () => {
        it('you must register a user correctly', async () => {
            bcrypt.hash.mockResolvedValueOnce('hashedPassword'); // Mock bcrypt.hash
            db.query.mockResolvedValueOnce({
                rows: [
                    {
                        id: 1,
                        email: 'test@example.com',
                        name: 'Test',
                        surname: 'User',
                        accept_terms: true,
                    },
                ],
            });

            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'test@example.com',
                    password: 'Test123!',
                    confirmPassword: 'Test123!',
                    name: 'Test',
                    surname: 'User',
                    acceptTerms: true,
                });

            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe('Utilisateur enregistré avec succès');
            expect(response.body.user).toMatchObject({
                email: 'test@example.com',
                name: 'Test',
                surname: 'User',
            });
        });

        it('should return an error if the email already exists', async () => {
            const error = new Error();
            error.code = '23505'; 
            db.query.mockRejectedValueOnce(error);

            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'test@example.com',
                    password: 'Test123!',
                    confirmPassword: 'Test123!',
                    name: 'Test',
                    surname: 'User',
                    acceptTerms: true,
                });

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error', 'Votre email existe déjà, veuillez vous connecter');
        });

        it('should return an error if the data is incomplete', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    email: '',
                    password: 'Test123!',
                    confirmPassword: 'Test123!',
                    name: '',
                    surname: '',
                    acceptTerms: false,
                });

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error', 'Veuillez remplir tous les champs obligatoires');
        });

        it('must return an error if the passwords do not match', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'test@example.com',
                    password: 'Test123!',
                    confirmPassword: 'Different123!',
                    name: 'Test',
                    surname: 'User',
                    acceptTerms: true,
                });

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error', 'Les mots de passe ne correspondent pas');
        });
    });

    describe('POST /api/auth/login', () => {
        it('you must log in correctly with valid credentials', async () => {
            db.query.mockResolvedValueOnce({
                rows: [
                    {
                        id: 1,
                        email: 'test@example.com',
                        password: 'hashedPassword',
                        name: 'Test',
                        surname: 'User',
                    },
                ],
            });
            bcrypt.compare.mockResolvedValueOnce(true); // Mock de bcrypt.compare

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'Test123!',
                });

            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe('Connexion réussie');
            expect(response.body.user).toMatchObject({
                email: 'test@example.com',
                name: 'Test',
                surname: 'User',
            });
        });

        it('must return an error if the user does not exist', async () => {
            db.query.mockResolvedValueOnce({ rows: [] });

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'Test123!',
                });

            expect(response.statusCode).toBe(401);
            expect(response.body).toHaveProperty('error', 'Email ou mot de passe incorrect, veuillez réessayer');
        });

        it('must return an error if the password is incorrect', async () => {
            db.query.mockResolvedValueOnce({
                rows: [
                    {
                        id: 1,
                        email: 'test@example.com',
                        password: 'hashedPassword',
                    },
                ],
            });
            bcrypt.compare.mockResolvedValueOnce(false); // Contraseña incorrecta

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'WrongPassword123!',
                });

            expect(response.statusCode).toBe(401);
            expect(response.body).toHaveProperty('error', 'Email ou mot de passe incorrect, veuillez réessayer');
        });

        it('should return an error if data is missing', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: '',
                    password: '',
                });

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('error', 'Veuillez remplir le champs sélectionné');
        });
    });
});
