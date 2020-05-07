import IMessageDto from "../Dtos/IMessageDto";

export default interface IChatsContentsRepository {
    getMesagesFromChat(chatId: number): Promise<IMessageDto[]>;
    createChatContentMessages(chatId: number, ...messages: IMessageDto[]): Promise<void>;
    insertMessagesChatContent(chatId: number, ...messages: IMessageDto[]): Promise<void>;
}