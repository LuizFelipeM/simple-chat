
exports.seed = function(knex) {
  const tableName = 'users';
  
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        {id: 1, name: 'Beatriz', email: 'beatriz@gmail.com', password: 'beatriz'},
        {id: 2, name: 'Luiz', email: 'luiz@gmail.com', password: 'l'},
        {id: 3, name: 'Ronaldo', email: 'naldinho@gmail.com', password: 'naldinho'},
        {id: 4, name: 'Luiza', email: 'luiza@gmail.com', password: 'luiza'}
      ]);
    });
};
