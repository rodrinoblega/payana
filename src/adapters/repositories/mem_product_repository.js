const ProductRepositoryInterface = require('./product_repository_interface');

class InMemoryProductRepository extends ProductRepositoryInterface {
    constructor() {
        super();
        this.products = [];
    }

    async save(data) {
        this.products.push(data);
        return data;
    }

    async findAll() {
        return this.products;
    }

    async delete(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error(`Product with id ${id} not found`);
        }
        const deletedProduct = this.products.splice(index, 1);
        return deletedProduct[0];
    }

    async patch(id, updates) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }

        Object.assign(product, updates);

        return product;
    }

    async findById(id) {
        for (const product of this.products) {
            if (product.id === id) {
                return product
            }
        }
    }
}

module.exports = InMemoryProductRepository;