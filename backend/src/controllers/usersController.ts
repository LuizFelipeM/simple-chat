import { Request, Response } from "express"
import { userServ } from "../bootstrapper";

const usersController = {
    async getUserInfo(req: Request, res: Response): Promise<Response> {
        const { email } = req.query;
        const resp = await userServ.getUserInformationByEmail(email.toString());

        return res.json(resp);
    },

    async createUser(req: Request, res: Response): Promise<Response> {
        const { name, email, password, imgUrl } = req.body;
        const resp = await userServ.createNewUser(name, email, password, imgUrl);

        return res.status(resp.statusCode === 1 ? 400 : 200).json(resp);
    },

    async deleteChat(req: Request, res: Response): Promise<Response> {
        const { email } = req.params;
        const resp = await userServ.deleteUser(email);

        return res.status(resp.statusCode === 1 ? 400 : 200).json(resp);
    }
}

export default usersController