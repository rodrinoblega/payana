const ClientRepositoryInterface = require('./client_repository_interface');

class InMemoryClientRepository extends ClientRepositoryInterface {
    constructor() {
        super();
        this.clients = [];
    }

    async save(data) {
        this.clients.push(data);
        return data;
    }

    async findAll() {
        return this.clients;
    }

    async delete(id) {
        const index = this.clients.findIndex(client => client.id === id);
        if (index === -1) {
            throw new Error(`Client with id ${id} not found`);
        }
        const deletedClient = this.clients.splice(index, 1);
        return deletedClient[0];
    }

    async patch(id, updates) {
        const client = this.clients.find(client => client.id === id);
        if (!client) {
            throw new Error(`Client with id ${id} not found`);
        }

        Object.assign(client, updates);

        return client;
    }

    async findById(id) {
        for (const client of this.clients) {
            if (client.id === id) {
                return client
            }
        }
    }
}

module.exports = InMemoryClientRepository;