/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('invoices', function(table) {
        table.increments('id').primary();
        table.integer('client_id').unsigned().notNullable().references('id').inTable('clients').onDelete('CASCADE');
        table.decimal('total', 10, 2).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('invoices');

};
