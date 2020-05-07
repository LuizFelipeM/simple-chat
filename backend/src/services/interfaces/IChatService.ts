import IChats from "../../interfaces/DB data/IChats";
import IResponseDto from "../../interfaces/Dtos/IRsponseDto";

export default interface IChatService {
    getChatListByUserEmail(email: string): Promise<IResponseDto<IChats | IChats[]>>;
    createNewChatAndAssigntoCreator(userId: number, name: string, description?: string, imgUrl?: string): Promise<IResponseDto<IChats | IChats[]>>;
    deleteChat(id: number): Promise<IResponseDto<IChats | IChats[]>>;
    assignUserToChatByEmail(chatId: number, email: string): Promise<IResponseDto<IChats | IChats[]>>;
}