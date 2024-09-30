const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;