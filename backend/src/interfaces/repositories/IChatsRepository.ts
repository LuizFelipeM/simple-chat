import IChats from "../DB data/IChats";
import IResponseDto from "../Dtos/IRsponseDto";

export default interface IChatsRepository { // extends IRepository<IChatMain> {
    getAllChatsId(): Promise<{id: number}[]>
    getByEmail(email: string): Promise<IChats[]>;
    createNewChat(name: string, description?:string, imgUrl?: string): Promise<IChats>;
    deleteChat(id: number): Promise<IChats>;
}