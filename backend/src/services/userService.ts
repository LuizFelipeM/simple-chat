import IUserRepository from "../interfaces/IUsersRepository";
import IUserService from "./interfaces/IUserService";

function userService(userRepo: IUserRepository): IUserService {
    return {
        async getUserInformationByEmail(email: string) { return await userRepo.getUserInfoByEmail(email) },
        async createNewUser(name: string, email: string, password: string, imgUrl?: string) { return await userRepo.createUser(name, email, password, imgUrl) },
        async deleteUser(email: string) { return await userRepo.deleteUser(email) },
    }
}

export default userService;