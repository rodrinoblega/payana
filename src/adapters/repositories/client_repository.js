const pool = require('../../frameworks/database');

class ClientRepository {
    constructor() {
    }
    async save(client) {
        try {
            const { id, name, email } = client;
            const result = await pool.query(
            'INSERT INTO clients (id, name, email) VALUES ($1, $2, $3) RETURNING *',
            [id, name, email]
            );
            console.log("noerror")
            return result.rows[0];
        } catch(error) {
            throw error;
        }
    }
    async findAll() {
        const result = await pool.query('SELECT * FROM clients');
        return result.rows;
    }
}
module.exports = ClientRepository;