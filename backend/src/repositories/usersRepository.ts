import knex from "../database/dbConnection";

const tableName = 'users'

const usersRepository = {
    findUserInfoByEmail: async (email: string) => (await knex(tableName).select('id', 'name', 'email', 'img_url').where({ email }))[0],

    createUser: (name: string, email: string, password: string, img_url?: string) => knex(tableName).insert({ name, email, password, img_url }),

    deleteUser: (email: string) => knex(tableName).where({ email }).del().returning('*')
}

export default usersRepository;