import IChatsContents from "../DB data/IChatsContents";
import IMessageDto from "../Dtos/IMessageDto";

export default interface IChatsContentsRepository {
    getMesagesFromChat(chatId: number): Promise<IChatsContents[]>;
    createChatContentMessages(chatId: number, messages?: IMessageDto | IMessageDto[]): Promise<void>;
    insertMessagesChatContent(chatId: number, ...messages: IMessageDto[]): Promise<void>;
}