/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('invoice_items', function(table) {
        table.increments('id').primary();
        table.integer('invoice_id').unsigned().notNullable().references('id').inTable('invoices').onDelete('CASCADE');
        table.integer('product_id').unsigned().notNullable().references('id').inTable('products').onDelete('CASCADE');
        table.integer('quantity').notNullable();
        table.decimal('price', 10, 2).notNullable();
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('invoice_items');

};
