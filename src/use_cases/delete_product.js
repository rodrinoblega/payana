class DeleteProduct {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(id) {
        try {
            return await this.productRepository.delete(id);
        } catch (error) {
            throw error 
        }
    }
}
module.exports = DeleteProduct;