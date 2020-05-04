
exports.seed = function(knex) {
  const tableName = 'users_chats'

  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        {chat_id: 1, user_id: 1},
        {chat_id: 1, user_id: 2},
        {chat_id: 2, user_id: 3},
        {chat_id: 2, user_id: 4},
        {chat_id: 3, user_id: 1},
        {chat_id: 3, user_id: 3},
      ]);
    });
};
