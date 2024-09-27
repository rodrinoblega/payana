const knex = require('knex');
const dbConfig = require('./knexfile.js');

const environment = process.env.NODE_ENV || 'development';
const db = knex(dbConfig[environment]);

async function runMigrations() {
  try {
    await db.migrate.latest();
    console.log('Migrations completed successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await db.destroy();
  }
}

runMigrations();
