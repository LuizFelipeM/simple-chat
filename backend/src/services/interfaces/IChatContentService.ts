import IMessageDto from "../../interfaces/Dtos/IMessageDto";
import IResponseDto from "../../interfaces/Dtos/IRsponseDto";

export default interface IChatContentService {
    getMessagesFromChat(chatId: number): Promise<IResponseDto<IMessageDto | IMessageDto[]>>;
    createChatContentMessages(chatId: number, messages: IMessageDto[]): Promise<IResponseDto<IMessageDto | IMessageDto[]>>;
    insertMessagesChatContent(chatId: number, messages: IMessageDto[]): Promise<IResponseDto<IMessageDto | IMessageDto[]>>;
}