/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('pets', (table) => {
        table.increments()
        table.string('pet_name')
        table.string('picture_pic')
        table.string('species')
        table.boolean('isfriendly')

    })
  
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
   return knex.schema.dropTable('pets')
  
};
