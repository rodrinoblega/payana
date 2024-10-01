const express = require('express');
const ClientController = require('../adapters/controllers/client_controller');
const CreateClient = require('../use_cases/create_client');
const ListClients = require('../use_cases/list_clients')
const DeleteClient = require('../use_cases/delete_client')
const ModifyClient = require('../use_cases/modify_client')
const PgClientRepository = require('../adapters/repositories/pg_client_repository');
const InMemoryRepository = require('../adapters/repositories/mem_client_repository');
const pool = require('../frameworks/database');


const app = express();
console.log('ENV: ' + process.env.ENV)

 
let clientRepository = new InMemoryRepository();

if (process.env.ENV === 'DEV') {
    pool.connect((err) => {
        if (err) {
          console.error('Database connection error', err.stack);
        } else {
          console.log('Connected to the PostgreSQL database');
        }
    });
      
   clientRepository = new PgClientRepository(pool);    
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

module.exports = app;