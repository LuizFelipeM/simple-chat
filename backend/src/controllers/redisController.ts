import { Request, Response } from 'express';

import redisService from '../services/redisService';
import IMessageDto from '../services/interfaces/IMessageDto';

const redisController = {
    async listAll(req: Request, res: Response): Promise<Response> {
        const { key } = req.query;
        return res.json(await redisService.getAllData(key.toString()));
    },

    async listMessages(req: Request, res: Response): Promise<Response> {
        const { chat_id } = req.query;
        return res.json(await redisService.getAllMessages(Number(chat_id)));
    },

    storeCache(req: Request, res: Response) {
        const body = req.body;
        redisService.setData(
            body.key,
            body.field,
            body.value
        );
    },

    storeMessage(req: Request, res: Response) {
        const message: IMessageDto = req.body;
        redisService.setMessage(message);
    }
}

export default redisController;