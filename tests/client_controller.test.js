const request = require('supertest');
const app = require('../src/frameworks/app');

describe('GET /clients', () => {
    it('should return a list of clients', async () => {
      const response = await request(app).get('/clients');
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
  
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('email');

      const client = response.body[0]
      expect(client).toHaveProperty('id', 1);
    });
  });