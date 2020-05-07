import IUserDto from "../Dtos/IUserDto";

export default interface IUsersChatsRepository { // extends IRepository<IChatMain> {
    getUsersFromChat(chatId: number): Promise<IUserDto[]>;
    assignUserToChat(userId: number, chatId: number): Promise<void>;
}