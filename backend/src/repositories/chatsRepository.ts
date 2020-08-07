import knex from "../database/dbConnection";
import IChats from "../interfaces/DB data/IChats";

const tableName = 'chats'

const chatsRepository = {
    async getAllChatsId() {
        return await knex(tableName).select('id')
    },

    async getChatsByUserId(userId: number): Promise<IChats[]> {
        return await knex(tableName)
            .select('*')
            .from(tableName)
            .whereIn('id', function() {
                this.select('chat_id')
                    .from('users_chats')
                    .leftJoin('users', 'users_chats.user_id', 'users.id')
                    .where('users.id', userId)
            })
    },

    async getChatsByUserEmail(email: string): Promise<IChats[]> {
        return await knex(tableName)
            .select('*')
            .from(tableName)
            .whereIn('id', function() {
                this.select('chat_id')
                    .from('users_chats')
                    .leftJoin('users', 'users_chats.user_id', 'users.id')
                    .where('users.email', email)
            })
    },

    async createNewChat(name: string, description?: string, imgUrl?: string): Promise<IChats> {
        return (await knex(tableName)
            .insert({
                name,
                description,
                img_url: imgUrl
            })
            .returning('*'))[0];
    },

    deleteChat(id: number) {
         knex(tableName)
            .where({ id })
            .del()
    }
}

export default chatsRepository;