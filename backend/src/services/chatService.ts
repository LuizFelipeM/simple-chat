import IChatService from "./interfaces/IChatService";
import IChats from "../interfaces/DB data/IChats";

import IChatsRepository from "../interfaces/repositories/IChatsRepository";
import IUsersRepository from "../interfaces/repositories/IUsersRepository";
import IUsersChatsRepository from "../interfaces/repositories/IUsersChatsRepository";

import ResponseDtoGen from "../utils/helper";

function chatService(
    usersRepo: IUsersRepository,
    chatsRepo: IChatsRepository,
    usersChatsRepo: IUsersChatsRepository,
): IChatService {
    const RespGen = new ResponseDtoGen<IChats | IChats[]>();

    async function assignUserToChatByUserId(chatId: number, userId: number) { return await usersChatsRepo.assignUserToChat(userId, chatId) }

    return {
        async getChatListByUserEmail(email: string) {
            try {
                const chats = await chatsRepo.getByEmail(email)
                
                return RespGen.success(chats);
            } catch(ex) {
                return RespGen.error(`Error on getChatListByUserEmail - ${ex}`)
            }
        },
        
        async createNewChatAndAssigntoCreator(userId: number, name: string, description?: string, imgUrl?: string) {
            try {
                const chat =  await chatsRepo.createNewChat(name, description, imgUrl);
                await assignUserToChatByUserId(chat.id, userId);

                return RespGen.success();
            } catch(ex) {
                return RespGen.error(`Error on createNewChatAndAssigntoCreator - ${ex}`)
            }
        },
        
        async deleteChat(id: number) {
            try {
                const chat = await chatsRepo.deleteChat(id);

                return RespGen.success(chat);
            } catch(ex) {
                return RespGen.error(`Error on deleteChat - ${ex}`);
            }
        },

        async assignUserToChatByEmail(chatId: number, email: string) {
            try {
                const user = await usersRepo.findUserInfoByEmail(email);
                await usersChatsRepo.assignUserToChat(user?.id, chatId);

                return RespGen.success();
            } catch(ex) {
                return RespGen.error(`Error on assignUserToChatByEmail - ${ex}`);
            }
        },

        
    }
}

export default chatService;