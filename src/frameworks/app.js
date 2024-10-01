const express = require('express');
const ClientController = require('../adapters/controllers/client_controller');
const CreateClient = require('../use_cases/create_client');
const ListClients = require('../use_cases/list_clients')
const DeleteClient = require('../use_cases/delete_client')
const ModifyClient = require('../use_cases/modify_client')
const PgClientRepository = require('../adapters/repositories/pg_client_repository');
const InMemoryClientRepository = require('../adapters/repositories/mem_client_repository');
const ProductController = require('../adapters/controllers/product_controller');
const CreateProduct = require('../use_cases/create_product');
const ListProducts = require('../use_cases/list_products');
const DeleteProduct = require('../use_cases/delete_product')
const ModifyProduct = require('../use_cases/modify_product')
const PgProductRepository = require('../adapters/repositories/pg_product_repository');
const InMemoryProductRepository = require('../adapters/repositories/mem_product_repository');
const pool = require('../frameworks/database');


const app = express();
console.log('ENV: ' + process.env.ENV)

 
let clientRepository = new InMemoryClientRepository();
let productRepository = new InMemoryProductRepository();

if (process.env.ENV === 'DEV') {
    pool.connect((err) => {
        if (err) {
          console.error('Database connection error', err.stack);
        } else {
          console.log('Connected to the PostgreSQL database');
        }
    });
      
   clientRepository = new PgClientRepository(pool);
   productRepository = new PgProductRepository(pool);  
}

const createClient = new CreateClient(clientRepository);
const listClients = new ListClients(clientRepository);
const deleteClient = new DeleteClient(clientRepository);
const modifyClient = new ModifyClient(clientRepository);
const clientController = new ClientController(createClient, listClients, deleteClient, modifyClient);

app.use(express.json());
app.post('/client', clientController.create.bind(clientController));
app.get('/clients', clientController.list.bind(clientController));
app.delete('/client/:id', clientController.delete.bind(clientController));
app.patch('/client/:id', clientController.update.bind(clientController));

const createProduct = new CreateProduct(productRepository);
const listProducts = new ListProducts(productRepository);
const deleteProduct = new DeleteProduct(productRepository);
const modifyProduct = new ModifyProduct(productRepository);
const productController = new ProductController(createProduct, listProducts, deleteProduct, modifyProduct);

app.post('/product', productController.create.bind(productController));
app.get('/products', productController.list.bind(productController));
app.delete('/product/:id', productController.delete.bind(productController));
app.patch('/product/:id', productController.update.bind(productController));

module.exports = app;