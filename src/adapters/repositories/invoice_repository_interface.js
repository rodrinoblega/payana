class InvoiceRepositoryInterface {
    async save(data) {}

    async saveItemsInfo(id, items) {}

    async findAll() {}

    async findItemsForInvoice(id) {}

    async startTransaction() {}

    async commitTransaction() {}

    async rollbackTransaction() {}
}



module.exports = InvoiceRepositoryInterface;