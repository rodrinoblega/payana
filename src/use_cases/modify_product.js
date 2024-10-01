class ModifyProduct {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(id, {name, price}) {
        try {
            return await this.productRepository.patch(id, { "name": name, "price": price });
        } catch (error) {
            throw error 
        }
    }
}
module.exports = ModifyProduct;