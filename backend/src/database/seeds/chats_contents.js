
exports.seed = function(knex) {
  const tableName = 'chats_contents'

  const messages1 = "Vc viu?"
  const timestamp1 = "2020-05-11T15:15:10.215Z"

  const messages2 = "o que?"
  const timestamp2 = "2020-05-11T15:15:15.215Z"

  const messages3 = "que a gente tá muito ferrado"
  const timestamp3 = "2020-05-11T15:16:10.215Z"

  const messages4 = "trocaram a data das nossas provas"
  const timestamp4 = "2020-05-11T15:16:12.215Z"

  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        {chat_id: 3, user_id: 1, message: messages1, message_sent_at: timestamp1},
        {chat_id: 3, user_id: 3, message: messages2, message_sent_at: timestamp2},
        {chat_id: 3, user_id: 1, message: messages3, message_sent_at: timestamp3},
        {chat_id: 3, user_id: 1, message: messages4, message_sent_at: timestamp4},
      ]);
    });
};
