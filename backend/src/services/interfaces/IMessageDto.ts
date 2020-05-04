import IMessage from "../../interfaces/Dtos/IMessageDto";

export default interface IMessageDto {
    chat_id: number,
    message: IMessage
}