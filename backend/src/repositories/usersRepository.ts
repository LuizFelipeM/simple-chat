import IUsersRepository from "../interfaces/repositories/IUsersRepository";
import knex from "../database/dbConnection";

const tableName = 'users'

const usersRepository: IUsersRepository = {
    async findUserInfoByEmail(email: string) {
        return (await knex(tableName)
            .select('name', 'email', 'img_url')
            .where({ email }))[0];
    },

    async createUser(name: string, email: string, password: string, img_url?: string) {
        return await knex(tableName)
            .insert({
                name,
                email,
                password,
                img_url
            });
    },

    async deleteUser(email: string) {
        return (await knex(tableName)
            .where({ email })
            .del()
            .returning('*'))[0];
    },
}

export default usersRepository;