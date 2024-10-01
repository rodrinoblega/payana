class InvoiceRepositoryInterface {
    async save(data) {}

    async saveItemsInfo(id, items) {}

    async findAll() {}

    async findItemsForInvoice(id) {}
}



module.exports = InvoiceRepositoryInterface;