const express = require('express');
const ClientController = require('../adapters/controllers/client_controller');
const CreateClient = require('../use_cases/create_client');
const ListClients = require('../use_cases/list_clients')
const ClientRepository = require('../adapters/repositories/client_repository');

const app = express();

const clientRepository = new ClientRepository();
const createClient = new CreateClient(clientRepository);
const listClients = new ListClients(clientRepository);
const clientController = new ClientController(createClient, listClients);

app.use(express.json());
app.post('/client', clientController.create.bind(clientController));
app.get('/clients', clientController.list.bind(clientController));

module.exports = app;