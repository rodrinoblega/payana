const request = require('supertest');
const app = require('../src/frameworks/app');

describe('/invoices', () => {

    it('should create an invoice and return the information', async () => {
        const responsePostClient = await request(app).post('/client').send({"id":1, "name":"client asd", "email":"asd@asd.com"});
        expect(responsePostClient.status).toBe(201);

        const responsePostProduct1 = await request(app).post('/product').send({"id":1, "name":"product asd", "price":12});
        expect(responsePostProduct1.status).toBe(201);

        const responsePostProduct2 = await request(app).post('/product').send({"id":2, "name":"product qwe", "price":15});
        expect(responsePostProduct2.status).toBe(201);
  
        const responsePostInvoice = await request(app).post('/invoice').send({"client_id":1, "items": [{"product_id": 1, "quantity": 1}, {"product_id": 2, "quantity": 2}]});
        expect(responsePostInvoice.status).toBe(201);


        const response = await request(app).get('/invoices');
  
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    
        expect(response.body[0]).toHaveProperty('invoice_id');
        expect(response.body[0]).toHaveProperty('client');
        expect(response.body[0]).toHaveProperty('items');

        expect(Array.isArray(response.body[0].items)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
  
        const responseDeleteClient = await request(app).delete('/client/1');
        expect(responseDeleteClient.status).toBe(200);

        const responseDeleteProduct1 = await request(app).delete('/product/1');
        expect(responseDeleteProduct1.status).toBe(200);

        const responseDeleteProduct2 = await request(app).delete('/product/2');
        expect(responseDeleteProduct2.status).toBe(200);
      });
});