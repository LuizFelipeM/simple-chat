import { Request, Response } from 'express';
import { ResponseDtoGen, ThrowException } from '../utils/helper';
import { ChatsContentsDto } from '../interfaces/Dtos/ChatsContentsDto';
import chatsContentsService from '../services/chatsContentsService';

const RespGen = new ResponseDtoGen<ChatsContentsDto | ChatsContentsDto[]>();

const chatsContentsController = {
    async getAllMessagesFromChat(req: Request, res: Response): Promise<Response> {
        try {
            const { chatId } = req.query;
            const resp = await chatsContentsService.getMessagesFromChat(Number(chatId));
    
            return res.json(resp);
        } catch(ex) {
            return res.status(400).json(ThrowException('getAllMessagesFromChat', ex));
        }
    },

    addMessageToChat(req: Request, res: Response): Response {
        try {
            const { chatId, userId, message, messageSentAt } = req.body;
            chatsContentsService.addMessageToChatContent(Number(chatId), Number(userId), message, messageSentAt);

            return res.status(204).send();
        } catch(ex) {
            return res.status(400).json(ThrowException('addMEssageToChat', ex));
        }
    },

    // async insertMessagesChatContent(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const { chatId, messages } = req.body;
    //         await chatsContentsServ.insertMessagesChatContent(Number(chatId), messages);

    //         return res.status(204).send();
    //     } catch(ex) {
    //         return res.status(400).json({ error: `Exception throw on insertMessagesChatContent - ${ex}` });
    //     }
    // }
}

export default chatsContentsController;