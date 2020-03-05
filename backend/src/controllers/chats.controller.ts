import { NextFunction, Request, Response } from 'express'

import ChatModel from '../models/chats.models';
import { IController } from '../interfaces/controller.interface';

const chatModel: ChatModel = new ChatModel();

class chatController implements IController {
    async list(req:Request, res:Response, next:NextFunction): Promise<any>{
        if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
            const response = await chatModel.index();
            return res.json(response);
        }else
            next();
    }

    async find(req:Request, res:Response, next:NextFunction): Promise<Response>{
        const queryPairs: string[][] = Object.entries(req.query)        
        const index = queryPairs.findIndex((element)=> element[0] === 'where')

        const response = await chatModel.show(queryPairs[index][1]);

        return res.json(response)
    }

    // O método store será utilizado somente no momento do início de um
    // novo chat com uma pessoa
    async create(req:Request, res:Response): Promise<any>{
        const response = await chatModel.store(req.body);

        if(response?.name === "error")
            return res.status(409).json({
                message: 'Error registering user',
                error: response?.detail?.split('=')[1]?.replace(/(\(|\))/g, '') 
            });

        return res.json(response);
    }

    // Toda nova mensagem em um chat já existente utilizará o método update
    // para enviar a mensagem para o servidor, pois o chat ficará armazenado
    async update(req:Request, res:Response){}

    // Utilizado no momento onde uma pessoa decide excluir a conversa
    async remove(req:Request, res:Response){}
}

export default chatController