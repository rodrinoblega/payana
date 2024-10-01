const RepositoryInterface = require('./repository_interface');

class PgClientRepository extends RepositoryInterface{
    constructor(pool) {
        super();
        this.pool = pool
    }
    async save(client) {
        try {
            const { id, name, email } = client;
            const result = await this.pool.query(
            'INSERT INTO clients (id, name, email) VALUES ($1, $2, $3) RETURNING *',
            [id, name, email]
            );

            return result.rows[0];
        } catch(error) {
            throw error;
        }
    }
    async findAll() {
        const result = await this.pool.query('SELECT * FROM clients');
        return result.rows;
    }

    async delete(id) {
        try {
            const result = await this.pool.query(
                'DELETE FROM clients WHERE id = $1 RETURNING *',
                [id]
            );
    
            if (result.rowCount === 0) {
                throw new Error(`Client with id ${id} not found`);
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

            const query = `UPDATE clients SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
            values.push(id);

            const result = await this.pool.query(query, values);

            if (result.rowCount === 0) {
                throw new Error(`Client with id ${id} not found`);
            }

            return result.rows[0]; 
        } catch (error) {
            throw error;
        }
    }
    
}
module.exports = PgClientRepository;