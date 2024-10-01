class ListClients {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    execute() {
        var clients = this.clientRepository.findAll();
        return clients
    }
}
module.exports = ListClients;