const request = require('supertest');
const app = require('../src/frameworks/app');

describe('/products', () => {
 
    it('should throw an error if dont provide info to change', async () => {
      const responsePost = await request(app).post('/product').send({"id":1, "name":"asd", "price":12});
      expect(responsePost.status).toBe(201);

      const responsePatch = await request(app).patch('/product/1').send();
      expect(responsePatch.status).toBe(400);
      expect(responsePatch.text).toBe('At least one field must be provided for update');

      const responseDelete = await request(app).delete('/product/1');
      expect(responseDelete.status).toBe(200);
    });

   it('should throw an error if I want to modify an invalid product id', async () => {
      const responseDelete = await request(app).delete('/product/asd');
      expect(responseDelete.status).toBe(400);
      expect(responseDelete.text).toBe('Invalid product ID')
    });

    it('should throw an error if I want to modify an no existed product id', async () => {
      const responsePatch = await request(app).patch('/product/123').send({"name":"rodri", "price":12.23});
      expect(responsePatch.status).toBe(500);
      expect(responsePatch.text).toBe('An error occurred while modifying product: Error: Product with id 123 not found')
    });

    it('should throw an error if I want to delete an invalid product id', async () => {
      const responseDelete = await request(app).delete('/product/asd');
      expect(responseDelete.status).toBe(400);
      expect(responseDelete.text).toBe('Invalid product ID')
    });

    it('should throw an error if I want to delete an no existed product id', async () => {
      const responseDelete = await request(app).delete('/product/123');
      expect(responseDelete.status).toBe(500);
      expect(responseDelete.text).toBe('An error occurred while deleting product: Error: Product with id 123 not found')
    });

    it('should create a product, delete it and return an empty list of products', async () => {
      const responsePost = await request(app).post('/product').send({"id":1, "name":"asd", "price":12.23});
      expect(responsePost.status).toBe(201);

      const responseDelete = await request(app).delete('/product/1');
      expect(responseDelete.status).toBe(200);

      const response = await request(app).get('/products');
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });

    it('should create a product and return list of products with one iteration', async () => {
      const responsePost = await request(app).post('/product').send({"id":1, "name":"asd", "price":12.23});
      expect(responsePost.status).toBe(201);

      const response = await request(app).get('/products');
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
  
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('price');

      const product = response.body[0]
      expect(product).toHaveProperty('id', 1);
      expect(product).toHaveProperty('name', 'asd');
      expect(product).toHaveProperty('price', 12.23);

      const responseDelete = await request(app).delete('/product/1');
      expect(responseDelete.status).toBe(200);
    });

    it('should create a product, modify it and return the modified product', async () => {
      const responsePost = await request(app).post('/product').send({"id":1, "name":"asd", "price":12.23});
      expect(responsePost.status).toBe(201);

      const responsePatch = await request(app).patch('/product/1').send({"name":"rodri", "price":12.25});
      expect(responsePatch.status).toBe(200);

      const response = await request(app).get('/products');
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
  
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('price');

      const product = response.body[0]
      expect(product).toHaveProperty('id', 1);
      expect(product).toHaveProperty('name', 'rodri');
      expect(product).toHaveProperty('price', 12.25);

      const responseDelete = await request(app).delete('/product/1');
      expect(responseDelete.status).toBe(200);
    });
  })