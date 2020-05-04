import IResponseDto from "./Dtos/IRsponseDto";
import IUsers from "./DB data/IUsers";

export default interface IUserRepository {
    getUserInfoByEmail(email: string): Promise<IUsers | IResponseDto>;
    createUser(name: string, email: string, password: string, imgUrl?: string): Promise<IResponseDto>;
    deleteUser(email: string): Promise<IResponseDto>;
}