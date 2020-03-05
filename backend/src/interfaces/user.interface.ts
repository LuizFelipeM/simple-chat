import { NextFunction, Response, Request } from "express";

export interface IUser {
    listUser(req:Request, res:Response, next:NextFunction): Promise<Response>;
    findUser(req:Request, res:Response, next:NextFunction): Promise<Response>;
    createUser(req:Request, res:Response, next:NextFunction): void;
    updateUser(req:Request, res:Response, next:NextFunction): Promise<void>;
    removeUser(req:Request, res:Response, next:NextFunction): Promise<void>;
    authUser(req:Request, res:Response, next:NextFunction): Promise<Response | undefined>;
}