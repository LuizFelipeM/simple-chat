// import messages from '../models/messages.model'
import dbAdapter from './utils/dbadapter'
import { NextFunction, Response, Request } from 'express'
import { IController } from '../interfaces/controller.interface'

class userChatsController implements IController {
    async list(req:Request, res:Response, next:NextFunction): Promise<any>{
        if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
            const response = await dbAdapter.query('SELECT * FROM user_chats')
            return res.json(response);
        }else
            next();
    }

    async find(req:Request, res:Response, next:NextFunction): Promise<Response>{
        const queryPairs: string[][] = Object.entries(req.query)        
        const index = queryPairs.findIndex((element)=> element[0] === 'where')

        const response = await dbAdapter.query(`SELECT * FROM chats WHERE ${queryPairs[index][1]}`)

        return res.json(response?.rows)
    }

    create(req:Request, res:Response, next:NextFunction): void{
        const { email, chat_id } = req.body

        dbAdapter.query('INSERT INTO user_chats(email, chat_id) VALUES($1, $2)', [email, chat_id], (err:any, response:any)=>{
            if(err) throw res.status(500).send(err)

            return res.json({ users_chat: {email, chat_id} })
        })
    }

    async update(req:Request, res:Response, next:NextFunction){}

    async remove(req:Request, res:Response, next:NextFunction){}
}

export default userChatsController