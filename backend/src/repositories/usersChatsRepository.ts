import knex from "../database/dbConnection";

const tableName = 'users_chats';

const usersChatsRepository = {
    getUsersFromChat: async (chat_id: number) =>
        await knex(tableName)
            .select('id', 'name', 'img_url')
            .leftJoin('users', `${tableName}.user_id`, 'users.id')
            .where({ chat_id }),

    getChatsFromUser: async (user_id: number) =>
        await knex(tableName)
            .select('id', 'name', 'description', 'img_url')
            .leftJoin('chats', `${tableName}.chat_id`, 'chats.id')
            .where({ user_id }),

    assignUserToChat: (user_id: number, chat_id: number) => knex(tableName).insert({ user_id, chat_id }),
}

export default usersChatsRepository;