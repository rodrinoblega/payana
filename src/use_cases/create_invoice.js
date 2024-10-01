const InvoiceItem = require('./../entities/invoice_item')


class CreateInvoice {
    constructor(clientRepository, productRepository, invoiceRepository) {
        this.clientRepository = clientRepository;
        this.productRepository = productRepository;
        this.invoiceRepository = invoiceRepository;
    }

    async execute(client_id, items) {
        try {
            this.validateItems(items);

            const client = await this.getClient(client_id);

            const { total, invoiceItems } = await this.calculateInvoiceItems(items);

            const invoice = await this.createInvoice(client.id, total); 

            await this.saveInvoiceItems(invoice.id, invoiceItems); 

            return invoice;
        } catch (error) {
            throw error;
        }
    }

    validateItems(items) {
        if (!Array.isArray(items) || items.length === 0) {
            throw new Error('Items are required and must be an array');
        }
    }

    async getClient(client_id) {
        const client = await this.clientRepository.findById(client_id);
        if (!client) {
            throw new Error(`Client with ID ${client_id} not found`);
        }
        return client;
    }

    async calculateInvoiceItems(items) {
        let total = 0;
        let invoiceItems = [];

        for (const item of items) {
            const product = await this.getProduct(item.product_id);
            invoiceItems.push(this.createInvoiceItem(item, product)); 
            total += product.price * item.quantity;
        }

        return { total, invoiceItems };
    }

    async getProduct(product_id) {
        const product = await this.productRepository.findById(product_id);
        if (!product) {
            throw new Error(`Product with ID ${product_id} not found`);
        }
        return product;
    }

    createInvoiceItem(item, product) {
        return new InvoiceItem(item.product_id, item.quantity, product.price);
    }

    async createInvoice(client_id, total) {
        return await this.invoiceRepository.save({ client_id, total });
    }

    async saveInvoiceItems(invoice_id, invoiceItems) {
        return await this.invoiceRepository.saveItemsInfo(invoice_id, invoiceItems);
    }
    
}

module.exports = CreateInvoice;