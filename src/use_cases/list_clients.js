class ListClients {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    execute() {
        let clients = this.clientRepository.findAll();
        return clients
    }
}
module.exports = ListClients;