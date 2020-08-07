import chatsContentsRepository from "../repositories/chatsContentsRepository";

const chatsContentsService = () => {
    return {
        getMessagesFromChat: async (chatId: number, limit?: number) => await chatsContentsRepository.getMesagesFromChat(chatId, limit),

        addMessageToChatContent: (chat_id: number, user_id: number, message: string, message_sent_at: string)  => chatsContentsRepository.addMessagesToChats({ chat_id, user_id, message, message_sent_at }),

        // async createChatContentMessages(chatId: number, messages: IMessageDto[]) {
        //     await chatsContentsRepository.createChatContentMessages(chatId, ...messages);
        // },

        // async insertMessagesChatContent(chatId: number, messages: IMessageDto[]) {
        //     await chatsContentsRepository.insertMessagesChatContent(chatId, ...messages);
        // }
    }
}

export default chatsContentsService();