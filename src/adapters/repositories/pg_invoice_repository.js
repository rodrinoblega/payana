const InvoiceRepositoryInterface = require('./invoice_repository_interface');
const Invoice = require('./../../entities/invoice')

class PgInvoiceRepository extends InvoiceRepositoryInterface{
    constructor(pool) {
        super();
        this.pool = pool
    }
    async save(invoice) {
        try {
            const { client_id, total } = invoice;
            const result = await this.pool.query(
            'INSERT INTO invoices (client_id, total) VALUES ($1, $2) RETURNING *',
            [client_id, total]
            );

            return new Invoice(result.rows[0].id, result.rows[0].client_id, result.rows[0].total);
        } catch(error) {
            throw error;
        }
    }

    async saveItemsInfo(id, items) {
        try {
            for (const item of items) {
                try {
                    await this.pool.query(
                        'INSERT INTO invoice_items (invoice_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
                        [id, item.product_id, item.quantity, item.price]
                    );
                
                } catch (error) {
                    throw error;
                }
            }
        } catch(error) {
            throw error;
        }
    }

    async findAll() {
        const result = await this.pool.query('SELECT * FROM invoices');
        return result.rows;
    }

    async findItemsForInvoice(id) {
        const query = 'SELECT * FROM invoice_items WHERE invoice_id = $1';
        const values = [id];
    
        try {
            const result = await this.pool.query(query, values);
    
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

}
module.exports = PgInvoiceRepository;