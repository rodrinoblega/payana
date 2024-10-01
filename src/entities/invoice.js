class Invoice {
    constructor(id, client_id, total) {
        this.id = id;
        this.client_id = client_id;
        this.total = total;
    }
}

module.exports = Invoice;