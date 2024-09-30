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
}
module.exports = PgClientRepository;