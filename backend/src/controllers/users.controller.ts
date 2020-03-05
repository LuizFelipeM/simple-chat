import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextFunction, Response, Request } from 'express'

import dbAdapter from './utils/dbadapter'
import { jwtSecret } from '../../secrets'

import { IUser } from '../interfaces/user.interface'
import UserModel from '../models/users.models'

const userModel: UserModel = new UserModel()

class userController implements IUser {
    async listUser(req:Request, res:Response, next:NextFunction): Promise<any>{
        if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
            const response = await userModel.index();
            return res.json(response);
        }else
            next();
    }

    async findUser(req:Request, res:Response, next:NextFunction): Promise<Response>{
        const queryPairs: string[][] = Object.entries(req.query)        
        const index = queryPairs.findIndex((element)=> element[0] === 'where')

        const response = await userModel.show(queryPairs[index][1]);

        return res.json(response)
    }

    createUser(req:Request, res:Response, next:NextFunction): void{
        const { name, email, password } = req.body
        const saultRounds = 10

        bcrypt.hash(password, saultRounds, async (err: Error, encrypted: string)=>{
            let response;

            if(err) throw res.status(500).json({ message: 'Error registering user please try again later', error: err })
            else{
                response = await userModel.store({name, email, encrypted});
                
                if(response?.name === "error")
                    return res.status(409).json({
                        message: 'Error registering user',
                        error: response?.detail?.split('=')[1]?.replace(/(\(|\))/g, '')
                    })

                return res.json(response);
            }
        })
        
    }

    async updateUser(req:Request, res:Response, next:NextFunction){}

    async removeUser(req:Request, res:Response, next:NextFunction){}

    async authUser(req:Request, res:Response, next:NextFunction){
        const { email, password } = req.body

        const response = await dbAdapter.query(`SELECT password FROM users WHERE email = '${email}'`)

        const match = await bcrypt.compare(password, response?.rows[0].password)

        if(match){
            const payload = { email }
            const token: string = jwt.sign(payload, jwtSecret, { expiresIn: '24h' })
            
            return res.json({ token: token })
        }else
            return res.status(401).send('Incorrect e-mail or password')
    }
}

export default userController