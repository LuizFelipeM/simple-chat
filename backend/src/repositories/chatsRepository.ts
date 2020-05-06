import IChatsRepository from "../interfaces/repositories/IChatsRepository";
import knex from "../database/dbConnection";

const tableName = 'chats'

const chatsRepository: IChatsRepository = {
    async getByEmail(email: string) {
        try {
            return await knex(tableName)
                .select('*')
                .from(tableName)
                .whereIn('id', function() {
                    this.select('chat_id')
                        .from('users_chats')
                        .leftJoin('users', 'users_chats.user_id', 'users.id')
                        .where('users.email', email)
                })
        } catch(ex) {
            throw ex;
        }
    },

    async createNewChat(
        name: string,
        description?: string,
        imgUrl?: string
    ) {
        try {
            return (await knex(tableName)
                .insert({
                    name,
                    description,
                    img_url: imgUrl
                })
                .returning('*'))[0];
        } catch(ex) {
            throw ex;
        }
    },

    async deleteChat(id: number) {
        try {
            return (await knex(tableName)
                .where({ id })
                .del()
                .returning('*'))[0]
        } catch(ex) {
            throw ex;
        }
    }
}

export default chatsRepository;