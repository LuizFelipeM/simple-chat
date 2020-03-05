import dbAdapter from "../controllers/utils/dbadapter";
import { IModels } from "../interfaces/models.interface";
import { IUserChat } from "../interfaces/data.interface";

class UserChatModel implements IModels<IUserChat> {
    async index(): Promise<object[]>{
        const res = await dbAdapter.query('SELECT * FROM user_chats')
        return res?.rows;
    }

    async show(query: string): Promise<any>{
        const res = await dbAdapter.query(`SELECT * FROM user_chats WHERE ${query}`);
        return res?.rows;
    }

    async store(data: IUserChat): Promise<any>{
        dbAdapter.query('INSERT INTO user_chats(email, chat_id) VALUES($1, $2)', [data.email, data.chat_id])
                    .catch((reason: any)=> reason);
    }

    async update(){}

    async destroy(){}
}

export default UserChatModel