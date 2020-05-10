import IMessageDto from "../../interfaces/Dtos/IMessageDto";

export default interface IChatsContentsService {
    getMessagesFromChat(chatId: number): Promise<IMessageDto[]>;
    createChatContentMessages(chatId: number, messages: IMessageDto[]): Promise<void>;
    insertMessagesChatContent(chatId: number, messages: IMessageDto[]): Promise<void>;
}