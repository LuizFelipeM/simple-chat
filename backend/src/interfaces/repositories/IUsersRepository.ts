import IUsers from "../DB data/IUsers";

export default interface IUsersRepository {
    findUserInfoByEmail(email: string): Promise<IUsers>;
    createUser(name: string, email: string, password: string, imgUrl?: string): Promise<IUsers>;
    deleteUser(email: string): Promise<IUsers>;
}