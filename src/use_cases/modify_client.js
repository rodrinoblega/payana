class ModifyClient {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(id, {name, email}) {
        try {
            return await this.clientRepository.patch(id, { "name": name, "email": email });
        } catch (error) {
            throw error 
        }
    }
}
module.exports = ModifyClient;