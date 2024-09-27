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
            res.status(201).send('Post created successfully.');
        } catch (error) {
            res.status(500).send('An error occurred while creating the post: ' + error);
        }
    }
    list(req, res) {
        res.status(200).send(this.listClients.execute());
    }
}
module.exports = ClientController;