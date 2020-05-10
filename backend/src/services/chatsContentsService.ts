import IMessageDto from "../interfaces/Dtos/IMessageDto";
import IChatsContentsRepository from "../interfaces/repositories/IChatsContentsRepository";
import IChatsContentsService from "./interfaces/IChatsContentsService";

function chatsContentsService(chatsContentsRepo: IChatsContentsRepository): IChatsContentsService {
    return {
        async getMessagesFromChat(chatId: number) {
            const messages = await chatsContentsRepo.getMesagesFromChat(chatId);
            
            return messages;
        },

        async createChatContentMessages(chatId: number, messages: IMessageDto[]) {
            await chatsContentsRepo.createChatContentMessages(chatId, ...messages);
        },

        async insertMessagesChatContent(chatId: number, messages: IMessageDto[]) {
            await chatsContentsRepo.insertMessagesChatContent(chatId, ...messages);
        }
    }
}

export default chatsContentsService;