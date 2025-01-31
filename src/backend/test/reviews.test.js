const request = require('supertest');
const app = require('../index');
const db = require('../db');

jest.mock('../db'); // Mock database

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
    console.error.mockRestore();
});

describe('Reviews API', () => {
    describe('POST /reviews', () => {
        it('should create a new review', async () => {
            db.query.mockResolvedValueOnce({
                rows: [{ id: 1, movie_title: 'Inception', review: 'Amazing movie!', rating: 5 }],
            });

            const response = await request(app).post('/reviews').send({
                user_id: 1,
                movie_title: 'Inception',
                review: 'Amazing movie!',
                rating: 5,
            });

            expect(response.statusCode).toBe(201);
            expect(response.body.movie_title).toBe('Inception');
        });

        it('should return 400 for missing review fields', async () => {
            const response = await request(app).post('/reviews').send({
                user_id: 1,
                movie_title: '',
                review: '',
                rating: null,
            });

            expect(response.statusCode).toBe(400);
        });

        it('should return 500 on database error', async () => {
            db.query.mockRejectedValueOnce(new Error('Database error'));

            const response = await request(app).post('/reviews').send({
                user_id: 1,
                movie_title: 'Inception',
                review: 'Amazing movie!',
                rating: 5,
            });

            expect(response.statusCode).toBe(500);
        });
    });

    describe('GET /reviews', () => {
        it('should fetch reviews by user', async () => {
            db.query.mockResolvedValueOnce({
                rows: [{ id: 1, user_id: 1, movie_title: 'Inception', review: 'Amazing!', rating: 5 }],
            });

            const response = await request(app).get('/reviews').query({ user_id: 1 });

            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('should return 404 if no reviews are found', async () => {
            db.query.mockResolvedValueOnce({ rows: [] });

            const response = await request(app).get('/reviews').query({ user_id: 99 });

            expect(response.statusCode).toBe(404);
        });

        it('should return 500 on database error', async () => {
            db.query.mockRejectedValueOnce(new Error('Database error'));

            const response = await request(app).get('/reviews').query({ user_id: 1 });

            expect(response.statusCode).toBe(500);
        });
    });
});
