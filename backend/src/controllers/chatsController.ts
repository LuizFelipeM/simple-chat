import { Request, Response } from "express"
import { chatServ } from "../bootstrapper";

const chatsController = {
    async listChatsByEmail(req: Request, res: Response): Promise<Response> {
        const { email } = req.query;
        const resp = await chatServ.getChatListByUserEmail(email.toString());
        

        return res.json(resp);
    },

    async createNewChat(req: Request, res: Response): Promise<Response> {
        const { name, description, imgUrl } = req.body;
        const { userid } = req.headers;

        const resp = await chatServ.createNewChatAndAssigntoCreator(Number(userid), name, description, imgUrl);

        return res.status(resp.statusCode === 1 ? 400 : 200).json(resp);
    },

    async deleteChat(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const resp = await chatServ.deleteChat(Number(id));

        return res.status(resp.statusCode === 1 ? 400 : 200).json(resp);
    }
}

export default chatsController