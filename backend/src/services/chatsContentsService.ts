import IChatsContentsRepository from "../interfaces/repositories/IChatsContentsRepository";
import IChatsContentsService from "./interfaces/IChatsContentsService";
import { ChatContentGen } from "../utils/helper";
import { ChatContent } from "../interfaces/Entities/ChatContent";

function chatsContentsService(chatsContentsRepo: IChatsContentsRepository): IChatsContentsService {
    return {
        async getMessagesFromChat(chatId: number, limit?: number) {
            const messages = await chatsContentsRepo.getMesagesFromChat(chatId, limit);
            
            return messages;
        },

        addMessageToChatContent(chat_id: number, user_id: number, message: string, message_sent_at: string) {
            chatsContentsRepo.addMessagesToChats({ chat_id, user_id, message, message_sent_at });
        },

        addMessagesToChatsContent(chatId: number, userIds: number[], messages: string[], messagesSentAt: string[]) {
            const msgsArray: ChatContent[] = [];

            userIds.forEach((id, i) => {
                msgsArray.push(ChatContentGen(chatId, id, messages[i], messagesSentAt[i]));
            });

            chatsContentsRepo.addMessagesToChats(msgsArray);
        }

        // async createChatContentMessages(chatId: number, messages: IMessageDto[]) {
        //     await chatsContentsRepo.createChatContentMessages(chatId, ...messages);
        // },

        // async insertMessagesChatContent(chatId: number, messages: IMessageDto[]) {
        //     await chatsContentsRepo.insertMessagesChatContent(chatId, ...messages);
        // }
    }
}

export default chatsContentsService;