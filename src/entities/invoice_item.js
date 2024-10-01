class InvoiceItem {
    constructor(product_id, quantity, price) {
        this.product_id = product_id;
        this.quantity = quantity;
        this.price = price;
    }
}

module.exports = InvoiceItem;