import IChatsService from "./interfaces/IChatsService";
import IChatsRepository from "../interfaces/repositories/IChatsRepository";
import IUsersRepository from "../interfaces/repositories/IUsersRepository";
import IUsersChatsRepository from "../interfaces/repositories/IUsersChatsRepository";

function chatsService(
    usersRepo: IUsersRepository,
    chatsRepo: IChatsRepository,
    usersChatsRepo: IUsersChatsRepository,
): IChatsService {

    async function assignUserToChatByUserId(chatId: number, userId: number) { return await usersChatsRepo.assignUserToChat(userId, chatId) }

    return {
        async getChatListByUserEmail(email: string) {
            const chats = await chatsRepo.getByEmail(email)
            return chats;
        },
        
        async createNewChatAndAssigntoCreator(userId: number, name: string, description?: string, imgUrl?: string) {
            const chat =  await chatsRepo.createNewChat(name, description, imgUrl);
            await assignUserToChatByUserId(chat.id, userId);
        },
        
        async deleteChat(id: number) {
            const chat = await chatsRepo.deleteChat(id);
        },

        async assignUserToChatByEmail(chatId: number, email: string) {
            const user = await usersRepo.findUserInfoByEmail(email);
            await usersChatsRepo.assignUserToChat(user?.id, chatId);
        },

        
    }
}

export default chatsService;