class ClientRepository {
    constructor() {
        var array = [{"id": 1, "name":"rodrigo", "email": "r@r.com"}]
        this.clients = array;
    }
    save(client) {
        this.clients.push(client);
    }
    findAll() {
        return this.clients;
    }
}
module.exports = ClientRepository;