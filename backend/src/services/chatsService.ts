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

    async function getAllChatsId() {
        return await usersChatsRepo.getAllChatsId()
    }

    async function getChatListByUserEmail(email: string) {
        const chats = await chatsRepo.getByEmail(email)
        return chats;
    }
    
    async function createNewChatAndAssigntoCreator(userId: number, name: string, description?: string, imgUrl?: string) {
        const chat =  await chatsRepo.createNewChat(name, description, imgUrl);
        await assignUserToChatByUserId(chat.id, userId);
    }
    
    async function deleteChat(id: number) {
        const chat = await chatsRepo.deleteChat(id);
    }
    
    async function assignUserToChatByEmail(chatId: number, email: string) {
        const user = await usersRepo.findUserInfoByEmail(email);
        await usersChatsRepo.assignUserToChat(user?.id, chatId);
    }

    return {
        getAllChatsId,
        getChatListByUserEmail,
        createNewChatAndAssigntoCreator,
        deleteChat,
        assignUserToChatByEmail
    }
}

export default chatsService;