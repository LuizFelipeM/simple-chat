import IMessageDto from "../Dtos/IMessageDto";

export default interface IChatsContents {
    chat_id: number,
    messages: IMessageDto[]
}