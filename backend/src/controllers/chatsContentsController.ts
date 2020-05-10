import { Request, Response } from 'express';
import { chatContentServ } from '../bootstrapper';
import ResponseDtoGen from '../utils/helper';
import IMessageDto from '../interfaces/Dtos/IMessageDto';

const RespGen = new ResponseDtoGen<IMessageDto | IMessageDto[]>();

const chatsContentsController = {
    async getAllMessagesFromChat(req: Request, res: Response): Promise<Response> {
        try {
            const { chatId } = req.query;
            const resp = await chatContentServ.getMessagesFromChat(Number(chatId));
    
            return res.json(resp);
        } catch(ex) {
            return res.status(400).json({ error: `Exception throw on getAllMessagesFromChat - ${ex}` });
        }
    },

    async createChatContentMessages(req: Request, res: Response): Promise<Response> {
        try {
            const { chatId, messages } = req.body;
            await chatContentServ.createChatContentMessages(Number(chatId), messages);

            return res.status(204).send();
        } catch(ex) {
            return res.status(400).json({ error: `Exception throw on createChatContentMessages - ${ex}` });
        }
    },

    async insertMessagesChatContent(req: Request, res: Response): Promise<Response> {
        try {
            const { chatId, messages } = req.body;
            await chatContentServ.insertMessagesChatContent(Number(chatId), messages);

            return res.status(204).send();
        } catch(ex) {
            return res.status(400).json({ error: `Exception throw on insertMessagesChatContent - ${ex}` });
        }
    }
}

export default chatsContentsController;