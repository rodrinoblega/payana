const InvoiceRepositoryInterface = require('./invoice_repository_interface');

class InMemoryInvoiceRepository extends InvoiceRepositoryInterface {
    constructor() {
        super();
        this.invoices = [];
    }

    async save(data) {
        this.invoices.push(data);
        return data;
    }

    async saveItemsInfo(id, items) {}

    async findItemsForInvoice(id) {}

    async findAll() {
        return this.invoices;
    }
}

module.exports = InMemoryInvoiceRepository;