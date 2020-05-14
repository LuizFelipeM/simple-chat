import { Request, Response } from 'express';

import IMessageDto from '../services/interfaces/IMessageDto';
import { cacheServ } from '../bootstrapper';

const redisController = {
    async listAll(req: Request, res: Response): Promise<Response> {
        const { key } = req.query;
        return res.json(await cacheServ.getAllData(key.toString()));
    },

    async listMessages(req: Request, res: Response): Promise<Response> {
        const { chat_id } = req.query;
        return res.json(await cacheServ.getAllMessages(Number(chat_id)));
    },

    storeCache(req: Request, res: Response) {
        const body = req.body;
        cacheServ.setData(
            body.key,
            body.field,
            body.value
        );
    },

    storeMessage(req: Request, res: Response) {
        const message: IMessageDto = req.body;
        cacheServ.setMessage(message);
    }
}

export default redisController;