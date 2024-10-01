class ListProducts {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    execute() {
        var products = this.productRepository.findAll();
        return products
    }
}
module.exports = ListProducts;