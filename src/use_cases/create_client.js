class CreateClient {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(id, name, email) {
        try {
            return await this.clientRepository.save({ "id": id, "name": name, "email": email });
        } catch (error) {
            throw error 
        }
    }
}

module.exports = CreateClient;