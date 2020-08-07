import knex from "../database/dbConnection";
import { ChatContent } from "../interfaces/Entities/ChatContent";
import { ChatsContentsDto } from "../interfaces/Dtos/ChatsContentsDto";

const tableName = 'chats_contents';

const chatsContentsRepository = {
    getMesagesFromChat: async (chat_id: number, limit = 15): Promise<ChatsContentsDto[]> => {
        return await knex(tableName)
            .select(
                knex.ref('users.name').as('user_name'),
                `${tableName}.*`
            )
            .leftJoin('users', 'users.id', `${tableName}.user_id`)
            .where({ chat_id })
            .orderBy(`${tableName}.message_sent_at`, 'asc')
            .limit(limit);
    },

    addMessagesToChats: (messages: ChatContent | ChatContent[]) => knex(tableName).insert(messages)
    
    // ----- Inserting messages with JSON as main field -----
    
    // async getMesagesFromChat(chat_id: number) {
    //     return (await knex(tableName)
    //         .select('messages')
    //         .where({ chat_id }))[0]?.messages;
    // },

    // async addMessageToChat(chat_id: number, ...messagesDto: IMessageDto[]) {
    //     const messages = JSON.stringify(messagesDto);

    //     await knex(tableName)
    //         .insert({ chat_id, messages });
    // },

    // async insertMessagesChatContent(chat_id: number, ...messagesDto: IMessageDto[]) {
    //     const messages = JSON.stringify(messagesDto);
    //     const subQuery = '(select json_agg(msg_element.elements) from (select elements from chats_contents, jsonb_array_elements(messages) as elements where chat_id = ? union select jsonb_array_elements(?::jsonb)) as msg_element)';

    //     await knex(tableName)
    //         .where({ chat_id })
    //         .update('messages', knex.raw(subQuery, [chat_id, messages]));
    // }

}

export default chatsContentsRepository;