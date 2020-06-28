import IUsersRepository from "../interfaces/repositories/IUsersRepository";
import IUsersService from "./interfaces/IUsersService";

function usersService(userRepo: IUsersRepository): IUsersService {
    return {
        async getUserInformationByEmail(email: string) {
            const user = await userRepo.findUserInfoByEmail(email);
            delete user.password
            
            return user;
        },

        async createNewUser(name: string, email: string, password: string, imgUrl?: string) {
            await userRepo.createUser(name, email, password, imgUrl);
        },

        async deleteUser(email: string) {
            await userRepo.deleteUser(email);
        },
    }
}

export default usersService;