class ListClients {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    execute() {
        return this.clientRepository.findAll();
    }
}
module.exports = ListClients;