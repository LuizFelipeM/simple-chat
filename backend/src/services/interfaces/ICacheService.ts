import IMessageDto from "./IMessageDto";
import IChat from "../../interfaces/DB data/IChatsContents";

export default interface ICacheService {
    setData(key: string | number, field: string, value: string): void;
    getAllData(key: string | number): any;

    setMessage(message: IMessageDto): void;
    getAllMessages(chat_id: number): any | IChat[];
}