import IChatContentService from "./interfaces/IChatContentService";
import IMessageDto from "../interfaces/Dtos/IMessageDto";
import ResponseDtoGen from "../utils/helper";
import IChatsContentsRepository from "../interfaces/repositories/IChatsContentsRepository";

function chatContentService(chatsContentsRepo: IChatsContentsRepository): IChatContentService {
    const RespGen = new ResponseDtoGen<IMessageDto | IMessageDto[]>();

    return {
        async getMessagesFromChat(chatId: number) {
            try {
                const messages = await chatsContentsRepo.getMesagesFromChat(chatId);
                
                return RespGen.success(messages); // data está retornando [] ao invés de {}
            } catch(ex) {
                return RespGen.error(`Error on getMessagesFromChat - ${ex}`);
            }
        },

        async createChatContentMessages(chatId: number, messages: IMessageDto[]) {
            try {
                await chatsContentsRepo.createChatContentMessages(chatId, ...messages);

                return RespGen.success();
            } catch(ex) {
                return RespGen.error(`Error on createInsertMessages - ${ex}`);
            }
        },

        async insertMessagesChatContent(chatId: number, messages: IMessageDto[]) {
            try {
                await chatsContentsRepo.insertMessagesChatContent(chatId, ...messages);

                return RespGen.success();
            } catch(ex) {
                return RespGen.error(`Error on createInsertMessages - ${ex}`);
            }
        }
    }
}

export default chatContentService;