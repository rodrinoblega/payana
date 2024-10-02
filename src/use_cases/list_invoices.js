const InvoiceDTO = require('./dtos/invoice_dto')

class ListInvoices {
    constructor(clientRepository, productRepository, invoiceRepository) {
        this.clientRepository = clientRepository;
        this.productRepository = productRepository;
        this.invoiceRepository = invoiceRepository;
    }

    async execute() {
        let invoicesDTO = [];
        const invoices = await this.invoiceRepository.findAll();
        for (const invoice of invoices) {
            const client = await this.getClient(invoice.client_id);

            const items = await this.invoiceRepository.findItemsForInvoice(invoice.id);

            const invoiceDTO = new InvoiceDTO(invoice, client, items)
            invoicesDTO.push(invoiceDTO)


        }

        return invoicesDTO
    }

    async getClient(client_id) {
        const client = await this.clientRepository.findById(client_id);
        if (!client) {
            throw new Error(`Client with ID ${client_id} not found`);
        }
        return client;
    }
}

module.exports = ListInvoices;