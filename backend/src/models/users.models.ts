import dbAdapter from "../controllers/utils/dbadapter";
import { IModels } from "../interfaces/models.interface";
import { IUserLogin } from "../interfaces/data.interface";

class userModel implements IModels<IUserLogin> {
    async index(): Promise<object[]>{
        const res = await dbAdapter.query('SELECT name, email FROM users');
        return res?.rows;
    }

    async show(query: string): Promise<any>{
        const res = await dbAdapter.query(`SELECT name, email FROM users WHERE ${query}`);
        return res?.rows;
    }

    async store(data: IUserLogin): Promise<any>{
        return await dbAdapter.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3)', [data.name, data.email, data.encrypted])
                    .catch((reason: any)=> reason);
    }

    async update(){}

    async destroy(){}
}

export default userModel;