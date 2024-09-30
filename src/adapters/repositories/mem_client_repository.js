const RepositoryInterface = require('./repository_interface');

class InMemoryRepository extends RepositoryInterface {
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
}

module.exports = InMemoryRepository;