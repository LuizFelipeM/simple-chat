import usersRepository from "../repositories/usersRepository";

const usersService = () => {
    return {
        getUserInformationByEmail: async (email: string) => await usersRepository.findUserInfoByEmail(email),

        createNewUser: (name: string, email: string, password: string, imgUrl?: string) => usersRepository.createUser(name, email, password, imgUrl),

        deleteUser: (email: string) => usersRepository.deleteUser(email),
    }
}

export default usersService();