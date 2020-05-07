import IResponseDto from "../../interfaces/Dtos/IRsponseDto";
import IMessageDto from "../../interfaces/Dtos/IMessageDto";

export default interface IChatsContentsService {
    getMessagesFromChat(chatId: number): IResponseDto<IMessageDto[]>;
    createChatContentMessages(chatId: number, messages: IMessageDto[]): IResponseDto;
    insertMessagesChatContent(chatId: number, messages: IMessageDto[]): IResponseDto;
}