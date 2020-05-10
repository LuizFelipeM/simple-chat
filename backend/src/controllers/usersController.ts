import { Request, Response } from "express"
import { userServ } from "../bootstrapper";
import ResponseDtoGen from "../utils/helper";
import IUsers from "../interfaces/DB data/IUsers";

const RespGen = new ResponseDtoGen<Omit<IUsers, 'password'>>();

const usersController = {
    async getUserInfo(req: Request, res: Response): Promise<Response> {
        try{
            const { email } = req.query;
            const resp = await userServ.getUserInformationByEmail(email.toString());

            return res.json(resp);
        } catch(ex) {
            return res.status(400).json({ error: `Exception throw on getUserInfo - ${ex}` });
        }
    },

    createUser(req: Request, res: Response): Response {
        try {
            const { name, email, password, imgUrl } = req.body;
            userServ.createNewUser(name, email, password, imgUrl);
    
            return res.status(204).send();
        } catch(ex) {
            return res.status(400).json({ error: `Exception throw on createUser - ${ex}` });
        }
    },

    deleteChat(req: Request, res: Response): Response {
        try {
            const { email } = req.params;
            userServ.deleteUser(email);

            return res.status(204).send();
        } catch(ex) {
            return res.status(400).json({ error: `Exception throw on deleteChat - ${ex}` });
        }
    }
}

export default usersController