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
        try {
            await this.createProduct.execute(id, name, price);
            res.status(201).send('Product created successfully.');
        } catch (error) {
            res.status(500).send('An error occurred while creating the product: ' + error);
        }
    }
    async list(req, res) {
        try {
            let products = await this.listProducts.execute()
            res.status(200).send(products);
        } catch (error) {
            res.status(500).send('An error occurred while listing products: ' + error);
        }
        
    }

    async delete(req, res) {
        try {
            const productId = parseInt(req.params.id, 10);
            if (isNaN(productId)) {
                return res.status(400).send('Invalid product ID');
            }

            let products = await this.deleteProduct.execute(productId)

            res.status(200).send(products);
        } catch (error) {
            res.status(500).send('An error occurred while deleting product: ' + error);
        }
        
    }

    async update(req, res) {
        const productId = parseInt(req.params.id, 10); 
        const { name, price } = req.body;

        if (isNaN(productId)) {
            return res.status(400).send('Invalid product ID'); 
        }

        if (!name && !price) {
            return res.status(400).send('At least one field must be provided for update');
        }

        try {
            await this.modifyProduct.execute(productId, { name, price });
            return res.status(200).json({ message: 'Product updated'});
        } catch (error) {
            res.status(500).send('An error occurred while modifying product: ' + error);
        }
    }
}
module.exports = ProductController;