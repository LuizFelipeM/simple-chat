import IChatsRepository from "../interfaces/IChatsRepository";
import IChatService from "./interfaces/IChatService";

function chatService(chatRepo: IChatsRepository): IChatService {
    return {
        async getChatListByUserEmail(email: string) { return await chatRepo.getByEmail(email) },
        async createNewChat(name: string, description?: string, imgUrl?: string) { return await chatRepo.createNewChat(name, description, imgUrl) },
        async deleteChat(id: number) { return await chatRepo.deleteChat(id) }
    }
}

export default chatService;