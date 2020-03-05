import dbAdapter from "../controllers/utils/dbadapter";
import { IModels } from "../interfaces/models.interface";

class ChatModel implements IModels<{ name: string }> {
    async index(): Promise<object[]>{
        const res = await dbAdapter.query('SELECT * FROM chats')
        return res?.rows;
    }

    async show(query: string): Promise<any>{
        const res = await dbAdapter.query(`SELECT * FROM chats WHERE ${query}`);
        return res?.rows;
    }

    async store(data: { name: string }): Promise<any>{
        return await dbAdapter.query('INSERT INTO chats(name) VALUES($1)', [data?.name])
                    .catch((reason: any)=> reason);
    }

    async update(){}

    async destroy(){}
}

export default ChatModel;