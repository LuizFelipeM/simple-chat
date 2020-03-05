import dbAdapter from './utils/dbadapter'
import { MessagesModel, isMessage } from '../models/messages.models'
import { Request, Response, NextFunction } from 'express'

import { IController } from '../interfaces/controller.interface'

const messagesModel: MessagesModel = new MessagesModel();

export default class messagesController implements IController {
    async list(req:Request, res:Response, next:NextFunction): Promise<any>{
        if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
            const response = await messagesModel.index();
            return res.json(response);
        }else
            next();
    }
    
    async find(req:Request, res:Response, next:NextFunction){
        const queryPairs: string[][] = Object.entries(req.query)        
        const index = queryPairs.findIndex((element)=> element[0] === 'where')

        const response = await messagesModel.show(queryPairs[index][1]);

        return res.json(response)
    }

    async create(req:Request, res:Response, next:NextFunction): Promise<Response|undefined>{
        const { content } = req.body

        if(isMessage(content).errors.length)
            return res.status(400).json(isMessage(content).errors[0].message);
        else
            return res.json(await messagesModel.store(req.body));
    }

    async update(req:Request, res:Response, next:NextFunction): Promise<Response | undefined>{
        const { content } = req.body

        if(isMessage(content).errors.length)
            return res.status(400).json(isMessage(content).errors[0].message);
        else
            return res.json(await messagesModel.update(req.body));
    }

    async remove(req:Request, res:Response, next:NextFunction){}
}