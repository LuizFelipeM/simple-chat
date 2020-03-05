import { Validator } from 'jsonschema'
import dbAdapter from '../controllers/utils/dbadapter';

import { IModels } from '../interfaces/models.interface';
import { IMessages } from '../interfaces/data.interface';

const fnSchema = new Validator();

class MessagesModel implements IModels<IMessages> {
    async index(): Promise<object[]>{
        const res = await dbAdapter.query('SELECT * FROM messages')
        return res?.rows;
    }

    async show(query: string): Promise<any>{
        const res = await dbAdapter.query(`SELECT * FROM messages WHERE ${query}`);
        return res?.rows;
    }

    async store(data: IMessages): Promise<any>{
        dbAdapter.query('INSERT INTO messages(chat_id, content) VALUES($1, $2)', [data.chat_id, data.content])
            .catch((reason: any)=> reason);
    }

    async update(data: IMessages){
        dbAdapter.query('UPDATE messages SET content = $2 WHERE chat_id = $1', [data.chat_id, data.content])
            .catch((reason: any)=> reason);
    }

    async destroy(){}
}

function isMessage(data: any){
    const messageSchema = {
        "id": "/messages",
        "type": "object",
        "properties": {
            "email": { "type": "string" },
            "message": { "type": "string" },
            "timestamp": { "type": "string" }
        },
        "required": [ "email", "timestamp" ]
    }

    const schema = {
        "id": "/fullChat",
        "type": "object",
        "properties": {
            "chat": {
                "type": "array",
                "items": { "$ref": "/messages" }
            }
        },
        "required": [ "chat" ]
    }

    fnSchema.addSchema(messageSchema, '/messages')

    return fnSchema.validate(data, schema)
}

export { MessagesModel, isMessage }