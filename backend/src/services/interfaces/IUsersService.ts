import IUsers from "../../interfaces/DB data/IUsers";

export default interface IUsersService {
    getUserInformationByEmail(email: string): Promise<Omit<IUsers, 'password'>>;
    createNewUser(name: string, email: string, password: string, imgUrl?: string): Promise<void>;
    deleteUser(email: string): Promise<void>;
}