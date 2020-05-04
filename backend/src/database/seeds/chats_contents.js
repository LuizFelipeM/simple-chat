
exports.seed = function(knex) {
  const tableName = 'chats_contents'

  const messages1 = JSON.stringify([{email: "beatriz@gmail.com", message: "No ten tomperro", timestamp: "10:10:05"}])
  const messages2 = JSON.stringify([{email: "naldinho@gmail.com", message: "Parece um penu", timestamp: "20:00:45"}])
  const messages3 = JSON.stringify([{email: "beatriz@gmail.com", message: "Azedão", timestamp: "15:24:55"}, {email: "naldinho@gmail.com", message: "tá nada", timestamp: "15:25:55"}])

  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        {chat_id: 1, messages: messages1},
        {chat_id: 2, messages: messages2},
        {chat_id: 3, messages: messages3},
      ]);
    });
};
