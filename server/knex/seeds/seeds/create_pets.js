/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pets').del()
  await knex('pets').insert([
    { id: 1, pet_name: 'Fluffy',picture_pic: 'cat', species: 'Dog', isfriendly: true },
    { id: 2, pet_name: 'Whiskers',picture_pic: 'dog', species: 'Cat', isfriendly: true },
    
  ]);
};
