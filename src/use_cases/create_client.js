const Client = require('../entities/client.js');
class CreateClient {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    execute(id, name, email) {
        const client = new Client(id, name, email);
        this.clientRepository.save(client);
    }
}
module.exports = CreateClient;