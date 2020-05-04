import IMessage from "../Dtos/IMessageDto";

export default interface IChatsContents {
    chat_id: number,
    messages: IMessage[]
}