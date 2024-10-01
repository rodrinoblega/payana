const ProductRepositoryInterface = require('./product_repository_interface');
const Product = require('./../../entities/product')


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

            return new Product(result.rows[0].id, result.rows[0].name, result.rows[0].price);
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
    
            return new Product(result.rows[0].id, result.rows[0].name, result.rows[0].price);
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

            return new Product(result.rows[0].id, result.rows[0].name, result.rows[0].price); 
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        const query = 'SELECT * FROM products WHERE id = $1';
        const values = [id];
    
        try {
            const result = await this.pool.query(query, values);
    
            return new Product(result.rows[0].id, result.rows[0].name, result.rows[0].price); 
        } catch (error) {
            throw error;
        }
    }
    
}
module.exports = PgProductRepository;