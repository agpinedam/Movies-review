const request = require('supertest');
const app = require('../index');
const axios = require('axios');

jest.mock('axios');

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
    console.error.mockRestore();
});

describe('Search API', () => {
    test('Should return a list of movies', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                Response: 'True',
                Search: [{ Title: 'Batman Begins', Year: '2005', imdbID: 'tt0372784' }],
            },
        });

        const response = await request(app).get('/search').query({ query: 'Batman' });

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('Should return 400 if query is missing', async () => {
        const response = await request(app).get('/search');

        expect(response.statusCode).toBe(400);
    });

    test('Should return 404 if no results are found', async () => {
        axios.get.mockResolvedValueOnce({
            data: { Response: 'False', Error: 'Movie not found!' },
        });

        const response = await request(app).get('/search').query({ query: 'NonExistentMovie' });

        expect(response.statusCode).toBe(404);
    });

    test('Should return 500 on API error', async () => {
        axios.get.mockRejectedValueOnce(new Error('OMDB API error'));

        const response = await request(app).get('/search').query({ query: 'Batman' });

        expect(response.statusCode).toBe(500);
    });
});
