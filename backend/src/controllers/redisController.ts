import { Request, Response } from 'express';

// import IMessageDto from '../services/interfaces/IMessageDto';
import { ChatsContentsDto } from '../interfaces/Dtos/ChatsContentsDto';
import redisService from '../services/redisService';

const redisController = {
    async listAll(req: Request, res: Response): Promise<Response> {
        const { key, id } = req.query;
        return res.json(await redisService.getAllData(key.toString(), parseInt(String(id))));
    },

    async listMessages(req: Request, res: Response): Promise<Response> {
        const { chat_id } = req.query

        const stringMsgs = await redisService.getAllMessages(Number(chat_id))
        const messages = stringMsgs.map((message: string) => JSON.parse(message))

        return res.json(messages)
    },

    storeCache(req: Request, res: Response) {
        const body = req.body;
        redisService.setData(
            body.key,
            body.id,
            body.field,
            body.value
        );
    },

    storeMessage(req: Request, res: Response) {
        try {
            // const message: IMessageDto = req.body
            const message: ChatsContentsDto = req.body
    
            redisService.setMessage(message)

            res.status(204).send()
        } catch(error) {
            res.status(404).json(error)
        }
    }
}

export default redisController;