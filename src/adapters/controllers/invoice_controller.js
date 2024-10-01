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
        try {
            await this.createInvoice.execute(client_id, items);
            res.status(201).send('Invoice created successfully.');
        } catch (error) {
            res.status(500).send('An error occurred while creating the invoice: ' + error);
        }
    }

    async list(req, res) {
        try {
            let invoices = await this.listInvoices.execute()
            res.status(200).send(invoices);
        } catch (error) {
            res.status(500).send('An error occurred while listing invoices: ' + error);
        }
        
    }
}

module.exports = InvoiceController;