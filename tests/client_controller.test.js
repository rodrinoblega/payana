const request = require('supertest');
const app = require('../src/frameworks/app');

describe('GET /clients', () => {
    beforeEach(async () => {
    });

    it('should create a client and return list of clients with one iteration', async () => {
      const responsePost = await request(app).post('/client').send({"id":1, "name":"asd", "email":"asd@asd.com"});
      expect(responsePost.status).toBe(201);

      const response = await request(app).get('/clients');
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
  
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('email');

      const client = response.body[0]
      expect(client).toHaveProperty('id', 1);
      expect(client).toHaveProperty('name', 'asd');
      expect(client).toHaveProperty('email', 'asd@asd.com');
    });
  });