class ClientController {
    constructor(createClient, listClients) {
        this.createClient = createClient;
        this.listClients = listClients;
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
}
module.exports = ClientController;