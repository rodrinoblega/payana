class ClientRepository {
    constructor() {
        this.clients = [];
    }
    save(client) {
        this.clients.push(client);
    }
    findAll() {
        return this.clients;
    }
}
module.exports = ClientRepository;