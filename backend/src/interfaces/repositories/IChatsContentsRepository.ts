import { ChatContent } from "../Entities/ChatContent";
import { ChatsContentsDto } from "../Dtos/ChatsContentsDto";

export default interface IChatsContentsRepository {
    getMesagesFromChat(chatId: number, limit?: number): Promise<ChatsContentsDto[]>;
    addMessagesToChats(messages: ChatContent | ChatContent[]): Promise<void>;
}