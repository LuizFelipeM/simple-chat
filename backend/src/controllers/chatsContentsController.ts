import { Request, Response } from 'express';
import { chatContentServ } from '../bootstrapper';

const chatsContentsController = {
    async getAllMessagesFromChat(req: Request, res: Response): Promise<Response> {
        const { chatId } = req.query;
        const resp = await chatContentServ.getMessagesFromChat(Number(chatId));

        return res.json(resp);
    },

    async createChatContentMessages(req: Request, res: Response): Promise<Response> {
        const { chatId, messages } = req.body;
        const resp = await chatContentServ.createChatContentMessages(Number(chatId), messages);

        return res.json(resp);
    },

    async insertMessagesChatContent(req: Request, res: Response): Promise<Response> {
        const { chatId, messages } = req.body;
        const resp = await chatContentServ.insertMessagesChatContent(Number(chatId), messages);

        return res.json(resp);
    }
}

export default chatsContentsController;