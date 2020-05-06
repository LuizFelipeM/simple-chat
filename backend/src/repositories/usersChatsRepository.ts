import IUsersChatsRepository from "../interfaces/repositories/IUsersChatsRepository";
import knex from "../database/dbConnection";

const tableName = 'users_chats';

const usersChatsRepository: IUsersChatsRepository = {
    async getUsersFromChat(chat_id: number) {
        try {
            return await knex(tableName)
                .select('id', 'name', 'img_url')
                .leftJoin('users_chats', 'users_chats.user_id', 'users.id')
                .where({ chat_id });
        } catch(ex) {
            throw ex;
        }
    },

    async assignUserToChat(user_id: number, chat_id: number) {
        try {
            await knex(tableName).insert({ user_id, chat_id });
        } catch(ex) {
            throw ex;
        }
    },
}

export default usersChatsRepository;