import IChatsRepository from "../interfaces/IChatsRepository";
import dbConnection from "../database/dbConnection";
import { ResponseDtoGen } from "../utils/helper";

const tableName = 'chats'

const chatsRepository: IChatsRepository = {
    async getByEmail(email: string) {
        try {
            return await dbConnection(tableName)
                .select('*')
                .from(tableName)
                .whereIn('id', function() {
                    this.select('chat_id')
                        .from('users_chats')
                        .leftJoin('users', 'users_chats.user_id', 'users.id')
                        .where('users.email', email)
                })
        } catch(exception) {
            return ResponseDtoGen.error(`Error on getByEmail - exception: ${exception}`);
        }
    },

    async createNewChat(
        name: string,
        description?: string,
        imgUrl?: string
    ) {
        try {
            await dbConnection(tableName)
                .insert({
                    name,
                    description,
                    img_url: imgUrl
                })

            return ResponseDtoGen.success();
        } catch(exception) {
            return ResponseDtoGen.error(`Error on createNewChat - exception: ${exception}`);
        }
    },

    async deleteChat(id: number) {
        try {
            await dbConnection(tableName)
                .where('id', id)
                .del()

            return ResponseDtoGen.success()
        } catch(exception) {
            return ResponseDtoGen.error(`Error on deleteChat - exception: ${exception}`);
        }
    }
}

export default chatsRepository;