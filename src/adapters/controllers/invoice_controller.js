const logger = require('../../logger');

class InvoiceController {
    constructor(createInvoice, listInvoices) {
        this.createInvoice = createInvoice
        this.listInvoices = listInvoices
    }

    async create(req, res) {
        const {
            client_id,
            items
        } = req.body;
        logger.info('Creating invoice');
        try {
            const invoice = await this.createInvoice.execute(client_id, items);
            logger.info('Invoice created successfully');
            res.status(201).send(invoice);
        } catch (error) {
            logger.error('An error occurred while creating the invoice: ' + error);
            res.status(500).send('An error occurred while creating the invoice: ' + error);
        }
    }

    async list(req, res) {
        logger.info('Listing invoices');
        try {
            let invoices = await this.listInvoices.execute()
            res.status(200).send(invoices);
        } catch (error) {
            logger.error('An error occurred while listing invoices: ' + error);
            res.status(500).send('An error occurred while listing invoices: ' + error);
        }
        
    }
}

module.exports = InvoiceController;