import IUsersRepository from "../interfaces/repositories/IUsersRepository";
import knex from "../database/dbConnection";

const tableName = 'users'

const usersRepository: IUsersRepository = {
    async findUserInfoByEmail(email: string) {
        try {
            return (await knex(tableName)
                .select('name', 'email', 'img_url')
                .where({ email }))[0];
        } catch(ex) {
            throw ex;
        }
    },

    async createUser(name: string, email: string, password: string, img_url?: string) {
        try {
            return await knex(tableName)
                .insert({
                    name,
                    email,
                    password,
                    img_url
                });
        } catch(ex) {
            throw ex;
        }
    },

    async deleteUser(email: string) {
        try {
            return (await knex(tableName)
                .where({ email })
                .del()
                .returning('*'))[0];
        } catch(ex) {
            throw ex;
        }
    },
}

export default usersRepository;