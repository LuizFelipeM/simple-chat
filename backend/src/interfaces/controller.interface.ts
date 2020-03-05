import { NextFunction, Response, Request } from "express";

export interface IController {
    list(req: Request, res: Response, next?: NextFunction): Promise<Response>;
    find(req: Request, res: Response, next?: NextFunction): Promise<Response>;
    create(req: Request, res: Response, next?: NextFunction): void;
    update(req: Request, res: Response, next?: NextFunction): Promise<void> | Promise<Response | undefined>;
    remove(req: Request, res: Response, next?: NextFunction): Promise<void>;
}