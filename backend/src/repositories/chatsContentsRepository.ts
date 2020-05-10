import IChatsContentsRepository from "../interfaces/repositories/IChatsContentsRepository";
import IMessageDto from "../interfaces/Dtos/IMessageDto";
import knex from "../database/dbConnection";

const tableName = 'chats_contents';

const chatsContentsRepository: IChatsContentsRepository = {
    async getMesagesFromChat(chat_id: number) {
        return (await knex(tableName)
            .select('messages')
            .where({ chat_id }))[0]?.messages;
    },

    async createChatContentMessages(chat_id: number, ...messagesDto: IMessageDto[]) {
        const messages = JSON.stringify(messagesDto);

        await knex(tableName)
            .insert({ chat_id, messages });
    },

    async insertMessagesChatContent(chat_id: number, ...messagesDto: IMessageDto[]) {
        const messages = JSON.stringify(messagesDto);
        const subQuery = '(select json_agg(msg_element.elements) from (select elements from chats_contents, jsonb_array_elements(messages) as elements where chat_id = ? union select jsonb_array_elements(?::jsonb)) as msg_element)';

        await knex(tableName)
            .where({ chat_id })
            .update('messages', knex.raw(subQuery, [chat_id, messages]));
    }

}

export default chatsContentsRepository;