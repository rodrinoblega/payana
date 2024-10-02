const InvoiceRepositoryInterface = require('./invoice_repository_interface');

class InMemoryInvoiceRepository extends InvoiceRepositoryInterface {
    constructor() {
        super();
        this.today = Date.now();
        this.id = 1;
        this.invoices = [];
        this.invoice_items = [];
    }

    async save(data) {
        data.id = this.id;
        this.id = this.id + 1;
        data.created_at = this.today;
        this.invoices.push(data);
        return data;
    }

    async saveItemsInfo(id, items) {
        for (const item of items) {
            this.invoice_items.push({"invoice_id": id, "product_id": item.product_id, "quantity": item.quantity, "price": item.price})
        }
    }

    async findItemsForInvoice(id) {
        let items = []
        for (const item of this.invoice_items) {
            if (item.invoice_id === id) {
                items.push(item)
            }
        }

        return items;
    }

    async findAll() {
        return this.invoices;
    }

    async startTransaction() {}

    async commitTransaction() {}

    async rollbackTransaction() {}
}

module.exports = InMemoryInvoiceRepository;