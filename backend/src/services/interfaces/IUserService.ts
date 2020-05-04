import IUsers from "../../interfaces/DB data/IUsers";
import IResponseDto from "../../interfaces/Dtos/IRsponseDto";

export default interface IUserService {
    getUserInformationByEmail(email: string): Promise<IUsers | IResponseDto>;
    createNewUser(name: string, email: string, password: string, imgUrl?: string): Promise<IResponseDto>;
    deleteUser(email: string): Promise<IResponseDto>;
}