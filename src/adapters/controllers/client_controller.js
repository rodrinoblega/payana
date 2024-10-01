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
        try {
            await this.createClient.execute(id, name, email);
            res.status(201).send('Client created successfully.');
        } catch (error) {
            res.status(500).send('An error occurred while creating the client: ' + error);
        }
    }
    async list(req, res) {
        try {
            var clients = await this.listClients.execute()
            res.status(200).send(clients);
        } catch (error) {
            res.status(500).send('An error occurred while listing clients: ' + error);
        }
        
    }

    async delete(req, res) {
        try {
            const clientId = parseInt(req.params.id, 10);
            if (isNaN(clientId)) {
                return res.status(400).send('Invalid client ID');
            }

            var clients = await this.deleteClient.execute(clientId)

            res.status(200).send(clients);
        } catch (error) {
            res.status(500).send('An error occurred while deleting client: ' + error);
        }
        
    }

    async update(req, res) {
        const clientId = parseInt(req.params.id, 10); 
        const { name, email } = req.body;

        if (isNaN(clientId)) {
            return res.status(400).send('Invalid client ID'); 
        }

        if (!name && !email) {
            return res.status(400).send('At least one field must be provided for update');
        }

        try {
            await this.modifyClient.execute(clientId, { name, email });
            return res.status(200).json({ message: 'Client updated'});
        } catch (error) {
            res.status(500).send('An error occurred while modifying client: ' + error);
        }
    }
}
module.exports = ClientController;