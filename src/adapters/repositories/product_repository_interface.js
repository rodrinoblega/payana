class ProductRepositoryInterface {
    async save(data) {}

    async findAll() {}

    async delete(id) {}

    async patch(id, updates) {}
}

module.exports = ProductRepositoryInterface;