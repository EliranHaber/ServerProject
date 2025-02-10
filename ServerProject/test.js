/**
 * @fileoverview Integration tests for the API endpoints
 * @requires supertest
 * @requires mongoose
 */

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');

beforeAll(async () => {
    try {
        await mongoose.connect('mongodb+srv://JackyLegs:eliran1010@cluster0.6aytt.mongodb.net/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
});

afterAll(async () => {
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
    }
});

describe('API Tests', () => {
    // Test about endpoint
    test('GET /api/about - should return team members', async () => {
        const response = await request(app)
            .get('/api/about');
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { first_name: 'Eliran', last_name: 'Haber' },
            { first_name: 'Lusil', last_name: 'Grozdanov' }
        ]);
    });

    // Test add cost endpoint
    test('POST /api/add - should add new cost', async () => {
        const newCost = {
            userid: '123123',
            description: 'test cost',
            category: 'food',
            sum: 10
        };

        const response = await request(app)
            .post('/api/add')
            .send(newCost);

        expect(response.status).toBe(200);
        expect(response.body.description).toBe('test cost');
        expect(response.body.category).toBe('food');
        expect(response.body.sum).toBe(10);
    });

    // Test report endpoint
    test('GET /api/report - should return monthly report', async () => {
        const response = await request(app)
            .get('/api/report?id=123123&year=2025&month=2');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('costs');
        expect(Array.isArray(response.body.costs)).toBe(true);
    });
});
