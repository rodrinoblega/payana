const logger = require('../../logger');

class ClientController {
    constructor(createClient, listClients, deleteClient, modifyClient) {
        this.createClient = createClient;
        this.listClients = listClients;
        this.deleteClient = deleteClient;
        this.modifyClient = modifyClient;
    }
    async create(req, res) {
        const {
            id,
            name,
            email
        } = req.body;
        logger.info('Creating client');
        try {
            const client = await this.createClient.execute(id, name, email);
            logger.info('Client created successfully');
            res.status(201).send(client);
        } catch (error) {
            logger.error('An error occurred while creating the client: ' + error);
            res.status(500).send('An error occurred while creating the client: ' + error);
        }
    }
    async list(req, res) {
        logger.info('Listing clients');
        try {
            let clients = await this.listClients.execute();
            res.status(200).send(clients);
        } catch (error) {
            logger.error('An error occurred while listing clients: ' + error);
            res.status(500).send('An error occurred while listing clients: ' + error);
        }
        
    }

    async delete(req, res) {
        logger.info('Deleting client ' + req.params.id);
        try {
            const clientId = parseInt(req.params.id, 10);
            if (isNaN(clientId)) {
                logger.error('Invalid client ID');
                return res.status(400).send('Invalid client ID');
            }

            const client = await this.deleteClient.execute(clientId);

            logger.info('Client deleted successfully');
            res.status(200).send(client);
        } catch (error) {
            logger.error('An error occurred while deleting client: ' + error);
            res.status(500).send('An error occurred while deleting client: ' + error);
        }
        
    }

    async update(req, res) {
        logger.info('Updating client ' + req.params.id)
        const clientId = parseInt(req.params.id, 10); 
        const { name, email } = req.body;

        if (isNaN(clientId)) {
            logger.error('Invalid client ID');
            return res.status(400).send('Invalid client ID'); 
        }

        if (!name && !email) {
            logger.error('At least one field must be provided for update');
            return res.status(400).send('At least one field must be provided for update');
        }

        try {
            const client = await this.modifyClient.execute(clientId, { name, email });
            logger.info('Client updated successfully');
            return res.status(200).json(client);
        } catch (error) {
            logger.error('An error occurred while modifying client: ' + error);
            res.status(500).send('An error occurred while modifying client: ' + error);
        }
    }
}
module.exports = ClientController;