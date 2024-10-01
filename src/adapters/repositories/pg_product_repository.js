const ProductRepositoryInterface = require('./product_repository_interface');

class PgProductRepository extends ProductRepositoryInterface{
    constructor(pool) {
        super();
        this.pool = pool
    }
    async save(product) {
        try {
            const { id, name, price } = product;
            const result = await this.pool.query(
            'INSERT INTO products (id, name, price) VALUES ($1, $2, $3) RETURNING *',
            [id, name, price]
            );

            return result.rows[0];
        } catch(error) {
            throw error;
        }
    }
    async findAll() {
        const result = await this.pool.query('SELECT * FROM products');
        return result.rows;
    }

    async delete(id) {
        try {
            const result = await this.pool.query(
                'DELETE FROM products WHERE id = $1 RETURNING *',
                [id]
            );
    
            if (result.rowCount === 0) {
                throw new Error(`Product with id ${id} not found`);
            }
    
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    async patch(id, updates) {
        try {
            const fields = [];
            const values = [];
            let index = 1;

            for (const [key, value] of Object.entries(updates)) {
                fields.push(`${key} = $${index++}`);
                values.push(value);
            }

            const query = `UPDATE products SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
            values.push(id);

            const result = await this.pool.query(query, values);

            if (result.rowCount === 0) {
                throw new Error(`Product with id ${id} not found`);
            }

            return result.rows[0]; 
        } catch (error) {
            throw error;
        }
    }
    
}
module.exports = PgProductRepository;