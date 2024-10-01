class ListProducts {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    execute() {
        let products = this.productRepository.findAll();
        return products
    }
}
module.exports = ListProducts;