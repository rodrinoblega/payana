class InvoiceDTO {
    constructor(invoice, client, items) {
      this.invoice_id = invoice.id;
      this.total = invoice.total;
      this.created_at = invoice.created_at;
      this.client = {
        id: client.id,
        name: client.name,
        email: client.email,
      };
      this.items = items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        price: item.price,
      }));
    }
  }
  
  module.exports = InvoiceDTO;