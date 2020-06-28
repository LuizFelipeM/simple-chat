import { ChatsContentsDto } from "../../interfaces/Dtos/ChatsContentsDto";

export default interface IChatsContentsService {
    getMessagesFromChat(chatId: number, limit?: number): Promise<ChatsContentsDto[]>;
    addMessageToChatContent(chatId: number, userId: number, message: string, messageSentAt: string): void;
    addMessagesToChatsContent(chatId: number, userIds: number[], messages: string[], messagesSentAt: string[]): void;
}