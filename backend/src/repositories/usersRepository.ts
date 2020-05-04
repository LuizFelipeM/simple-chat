import IUserRepository from "../interfaces/IUsersRepository";
import dbConnection from "../database/dbConnection";
import { ResponseDtoGen } from "../utils/helper";

const tableName = 'users'

const usersRepository: IUserRepository = {
    async getUserInfoByEmail(email: string) {
        try {
            return (await dbConnection(tableName)
                .select('name', 'email', 'img_url')
                .where('email', email))[0];
        } catch(exception) {
            return ResponseDtoGen.error(`Error on getUserInfoByEmail - exception: ${exception}`);
        }
    },

    async createUser(name: string, email: string, password: string, imgUrl?: string) {
        try {
            await dbConnection(tableName)
                .insert({
                    name,
                    email,
                    password,
                    img_url: imgUrl
                });

            return ResponseDtoGen.success();
        } catch(exception) {
            return ResponseDtoGen.error(`Error on createUser - exception: ${exception}`);
        }
    },

    async deleteUser(email: string) {
        try {
            await dbConnection(tableName)
                .where('email', email)
                .del();

            return ResponseDtoGen.success();
        } catch(exception) {
            return ResponseDtoGen.error(`Error on deleteUser - exception: ${exception}`);
        }
    },
}

export default usersRepository;