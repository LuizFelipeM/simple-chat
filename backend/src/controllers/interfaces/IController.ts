import { Request, Response } from "express";
import IReturn from "./IReturn";

interface IController {
    list(res: Response, req?: Request): Promise<Response>;
    find(req: Request, res: Response): Promise<Response>;
    create(req: Request, res: Response): Promise<IReturn>;
    update(req: Request, res: Response): Promise<IReturn>;
    delete(req: Request, res: Response): Promise<IReturn>;
}

export default IController;