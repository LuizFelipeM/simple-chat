import usersChatsRepository from "../repositories/usersChatsRepository";
import chatsRepository from "../repositories/chatsRepository";
import usersRepository from "../repositories/usersRepository";

const chatsService = () => {

    const assignUserToChatByUserId = (chatId: number, userId: number) => usersChatsRepository.assignUserToChat(userId, chatId)

    const getAllChatsId = async () => await chatsRepository.getAllChatsId()

    const getChatListByUserId = async (userId: number) =>  await chatsRepository.getChatsByUserId(userId)

    const getChatListByUserEmail = async (email: string) => await chatsRepository.getChatsByUserEmail(email)
    
    const createNewChatAndAssignToCreator = async (userId: number, chatName: string, description?: string, imgUrl?: string) => {
        const chat =  await chatsRepository.createNewChat(chatName, description, imgUrl)
        assignUserToChatByUserId(chat.id, userId)
    }
    
    const deleteChat = (id: number) => chatsRepository.deleteChat(id)
    
    const assignUserToChatByEmail = async (chatId: number, email: string) => {
        const user = await usersRepository.findUserInfoByEmail(email)
        usersChatsRepository.assignUserToChat(user?.id, chatId)
    }

    const assignUserToChatById = (chatId: number, userId: number) => usersChatsRepository.assignUserToChat(userId, chatId)

    return {
        getAllChatsId,
        getChatListByUserId,
        getChatListByUserEmail,
        createNewChatAndAssignToCreator,
        deleteChat,
        assignUserToChatByEmail,
        assignUserToChatById
    }
}

export default chatsService();