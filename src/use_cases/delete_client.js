class DeleteClient {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(id) {
        try {
            return await this.clientRepository.delete(id);
        } catch (error) {
            throw error 
        }
    }
}
module.exports = DeleteClient;