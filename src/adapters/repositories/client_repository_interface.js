class ClientRepositoryInterface {
    async save(data) {}

    async findAll() {}

    async delete(id) {}

    async patch(id, updates) {}

    async findById(id) {}
}

module.exports = ClientRepositoryInterface;