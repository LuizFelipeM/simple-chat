
exports.seed = function(knex) {
  const tableName = 'chats'

  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        {id: 1, name: 'Tomperro', description: 'Baunilha'},
        {id: 2, name: 'Pneu', description: 'Preto'},
        {id: 3, name: 'Bolo de limõ', description: 'Azedo'},
      ]);
    });
};
