const request = require('supertest');
const app = require('../src/frameworks/app');

describe('/clients', () => {
    beforeEach(async () => {
    });

  
    it('should throw an error if dont provide info to change', async () => {
      const responsePost = await request(app).post('/client').send({"id":1, "name":"asd", "email":"asd@asd.com"});
      expect(responsePost.status).toBe(201);

      const responsePatch = await request(app).patch('/client/1').send();
      expect(responsePatch.status).toBe(400);
      expect(responsePatch.text).toBe('At least one field must be provided for update');

      const responseDelete = await request(app).delete('/client/1');
      expect(responseDelete.status).toBe(200);
    });

    it('should throw an error if I want to modify an invalid client id', async () => {
      const responseDelete = await request(app).delete('/client/asd');
      console.log(responseDelete)
      expect(responseDelete.status).toBe(400);
      expect(responseDelete.text).toBe('Invalid client ID')
    });

    it('should throw an error if I want to modify an no existed client id', async () => {
      const responsePatch = await request(app).patch('/client/123').send({"name":"rodri", "email":"rodri@asd.com"});
      expect(responsePatch.status).toBe(500);
      expect(responsePatch.text).toBe('An error occurred while modifying client: Error: Client with id 123 not found')
    });

    it('should throw an error if I want to delete an invalid client id', async () => {
      const responseDelete = await request(app).delete('/client/asd');
      expect(responseDelete.status).toBe(400);
      expect(responseDelete.text).toBe('Invalid client ID')
    });

    it('should throw an error if I want to delete an no existed client id', async () => {
      const responseDelete = await request(app).delete('/client/123');
      console.log(responseDelete)
      expect(responseDelete.status).toBe(500);
      expect(responseDelete.text).toBe('An error occurred while deleting client: Error: Client with id 123 not found')
    });

    it('should create a client, delete it and return an empty list of clients', async () => {
      const responsePost = await request(app).post('/client').send({"id":1, "name":"asd", "email":"asd@asd.com"});
      expect(responsePost.status).toBe(201);

      const responseDelete = await request(app).delete('/client/1');
      expect(responseDelete.status).toBe(200);

      const response = await request(app).get('/clients');
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
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

      const responseDelete = await request(app).delete('/client/1');
      expect(responseDelete.status).toBe(200);
    });

    it('should create a client, modify it and return the modified client', async () => {
      const responsePost = await request(app).post('/client').send({"id":1, "name":"asd", "email":"asd@asd.com"});
      expect(responsePost.status).toBe(201);

      const responsePatch = await request(app).patch('/client/1').send({"name":"rodri", "email":"rodri@asd.com"});
      expect(responsePatch.status).toBe(200);

      const response = await request(app).get('/clients');
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
  
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('email');

      const client = response.body[0]
      expect(client).toHaveProperty('id', 1);
      expect(client).toHaveProperty('name', 'rodri');
      expect(client).toHaveProperty('email', 'rodri@asd.com');

      const responseDelete = await request(app).delete('/client/1');
      expect(responseDelete.status).toBe(200);
    });
  });