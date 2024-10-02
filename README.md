# Payana - Invoice creation system

![technology Node](https://img.shields.io/badge/technology-Node-blue.svg)
![Language Javascript](https://img.shields.io/badge/Language-JavaScript-brightgreen.svg)

This is a Node JavaScript application to handle clients, products and invoices.

## Service diagram

The architecture is based on the concept of clean architecture in wich we have entities, use cases, adapters and frameworks.

![](static/Payana-clean.arch.jpg)

## How to run the application

You can run the app locally with Docker executing

```docker compose up --build ```

This command will:
- Start a PostgreSQL locally in the port 5432
- Make all the migration process through Knex js using the files in /migrations
- Start the payana API locally in the port 3000

## Endpoints

### Client
- GET /products --> List all the products
`curl --request GET \
  --url http://localhost:3000/products`

    
- POST /product --> Create a product
`curl --request POST \
  --url http://localhost:3000/product \
  --header 'Content-Type: application/json' \
  --data '{
	"id": 7,
	"name": "Rodrigo",
	"price": 17
}'`

- PATCH /product/:id --> Modify a product
`curl --request PATCH \
  --url http://localhost:3000/product/7 \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "asd",
	"price": 7
}'`

- DELETE /product/:id --> Delete a product
`curl --request DELETE \
  --url http://localhost:3000/product/7`


 
## Questions

* [rnoblega@gmail.com](rnoblega@gmail.com)

