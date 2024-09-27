class ListClients {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    execute() {
        var clients = this.clientRepository.findAll();
        console.log(clients)
        return clients
    }
}
module.exports = ListClients;