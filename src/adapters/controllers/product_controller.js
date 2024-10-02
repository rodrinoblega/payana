const logger = require('../../logger');

class ProductController {
    constructor(createProduct, listProducts, deleteProduct, modifyProduct) {
        this.createProduct = createProduct;
        this.listProducts = listProducts;
        this.deleteProduct = deleteProduct;
        this.modifyProduct = modifyProduct;
    }
    async create(req, res) {
        const {
            id,
            name,
            price
        } = req.body;
        logger.info('Creating product');
        try {
            const product = await this.createProduct.execute(id, name, price);
            logger.info('Product created successfully');
            res.status(201).send(product);
        } catch (error) {
            logger.error('An error occurred while creating the product: ' + error);
            res.status(500).send('An error occurred while creating the product: ' + error);
        }
    }
    async list(req, res) {
        logger.info('Listing products');
        try {
            let products = await this.listProducts.execute()
            res.status(200).send(products);
        } catch (error) {
            logger.error('An error occurred while listing products: ' + error);
            res.status(500).send('An error occurred while listing products: ' + error);
        }
        
    }

    async delete(req, res) {
        logger.info('Deleting product ' + req.params.id);
        try {
            const productId = parseInt(req.params.id, 10);
            if (isNaN(productId)) {
                logger.error('Invalid product ID');
                return res.status(400).send('Invalid product ID');
            }

            const product = await this.deleteProduct.execute(productId)

            logger.info('Product deleted successfully');
            res.status(200).send(product);
        } catch (error) {
            logger.error('An error occurred while deleting product: ' + error);
            res.status(500).send('An error occurred while deleting product: ' + error);
        }
        
    }

    async update(req, res) {
        logger.info('Updating product ' + req.params.id);
        const productId = parseInt(req.params.id, 10); 
        const { name, price } = req.body;

        if (isNaN(productId)) {
            logger.error('Invalid product ID');
            return res.status(400).send('Invalid product ID'); 
        }

        if (!name && !price) {
            logger.error('At least one field must be provided for update');
            return res.status(400).send('At least one field must be provided for update');
        }

        try {
            const product = await this.modifyProduct.execute(productId, { name, price });
            logger.info('Product updated successfully');
            return res.status(200).json(product);
        } catch (error) {
            logger.error('An error occurred while modifying product: ' + error);
            res.status(500).send('An error occurred while modifying product: ' + error);
        }
    }
}
module.exports = ProductController;