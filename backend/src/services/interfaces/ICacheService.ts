import { ChatsContentsDto } from "../../interfaces/Dtos/ChatsContentsDto";

type MessagesInChat = {
    [id: number]: string[]
}

export default interface ICacheService {
    setData(key: string | number, field: string, value: string): void
    getDataByField(key: string | number, field: string): any
    getAllData(key: string | number): any

    setMessage(message: ChatsContentsDto): Promise<void>
    getAllMessages(chat_id: number): Promise<string[]> // | ChatsContentsDto[]>

    getAllMessagesByChat(chatIds: number[]): Promise<Promise<MessagesInChat>[]>
}