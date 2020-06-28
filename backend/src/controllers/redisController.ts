import { Request, Response } from 'express';

// import IMessageDto from '../services/interfaces/IMessageDto';
import { cacheServ } from '../bootstrapper';
import { ChatsContentsDto } from '../interfaces/Dtos/ChatsContentsDto';

const redisController = {
    async listAll(req: Request, res: Response): Promise<Response> {
        const { key } = req.query;
        return res.json(await cacheServ.getAllData(key.toString()));
    },

    async listMessages(req: Request, res: Response): Promise<Response> {
        const { chat_id } = req.query

        const stringMsgs = await cacheServ.getAllMessages(Number(chat_id))
        const messages = stringMsgs.map((message: string) => JSON.parse(message))

        return res.json(messages)
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
        try {
            // const message: IMessageDto = req.body
            const message: ChatsContentsDto = req.body
    
            cacheServ.setMessage(message)

            res.status(204).send()
        } catch(error) {
            res.status(404).json(error)
        }
    }
}

export default redisController;