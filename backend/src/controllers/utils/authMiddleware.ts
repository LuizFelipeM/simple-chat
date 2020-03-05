import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { jwtSecret } from '../../../secrets'

function withAuth(req: Request, res: Response, next: NextFunction){
    const token: string | string[] | undefined = req?.headers?.token
    
    if(!token)
        res.status(401).json({ error: 'Unauthorized: No token provided' })
    else{
        jwt.verify(token.toString(), jwtSecret, (err: Error)=>{
            if(err) throw res.status(401).send(err)
            else next()
        })
    }
}

export default withAuth