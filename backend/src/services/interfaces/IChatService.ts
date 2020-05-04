import IChats from "../../interfaces/DB data/IChats";
import IResponseDto from "../../interfaces/Dtos/IRsponseDto";

export default interface IChatService {
    getChatListByUserEmail(email: string): Promise<IChats[] | IResponseDto>;
    createNewChat(name: string, description?: string, imgUrl?: string): Promise<IResponseDto>;
    deleteChat(id: number): Promise<IResponseDto>;
}