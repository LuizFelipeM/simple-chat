import { ChatContent } from "../../interfaces/Entities/ChatContent";

export default interface IChatsContentsService {
    getMessagesFromChat(chatId: number, limit?: number): Promise<ChatContent[]>;
    addMessageToChatContent(chatId: number, userId: number, message: string, messageSentAt: string): void;
    addMessagesToChatsContent(chatId: number, userIds: number[], messages: string[], messagesSentAt: string[]): void;
}