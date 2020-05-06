import IUsersRepository from "../interfaces/repositories/IUsersRepository";
import IUserService from "./interfaces/IUserService";
import ResponseDtoGen from "../utils/helper";
import IUsers from "../interfaces/DB data/IUsers";

function userService(userRepo: IUsersRepository): IUserService {
    const RespGen = new ResponseDtoGen<Omit<IUsers, 'password'>>();

    return {
        async getUserInformationByEmail(email: string) {
            try {
                const user = await userRepo.findUserInfoByEmail(email);
                return RespGen.success(user);
            } catch(ex) {
                return RespGen.error(`Error on getUserInformation - ${ex}`);
            }
        },

        async createNewUser(name: string, email: string, password: string, imgUrl?: string) {
            try {
                const user = await userRepo.createUser(name, email, password, imgUrl);
                return RespGen.success(user);
            } catch(ex) {
                return RespGen.error(`Error on createNewUser - ${ex}`);
            }
        },

        async deleteUser(email: string) {
            try {
                const user = await userRepo.deleteUser(email);
                return RespGen.success(user);
            } catch(ex) {
                return RespGen.error(`Error on deleteUser - ${ex}`);
            }
        },
    }
}

export default userService;