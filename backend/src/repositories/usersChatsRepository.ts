import IUsersChatsRepository from "../interfaces/repositories/IUsersChatsRepository";
import knex from "../database/dbConnection";

const tableName = 'users_chats';

const usersChatsRepository: IUsersChatsRepository = {
    async getUsersFromChat(chat_id: number) {
        return await knex(tableName)
            .select('id', 'name', 'img_url')
            .leftJoin('users_chats', 'users_chats.user_id', 'users.id')
            .where({ chat_id })
    },

    async assignUserToChat(user_id: number, chat_id: number) {
        await knex(tableName).insert({ user_id, chat_id })
    },
}

export default usersChatsRepository;