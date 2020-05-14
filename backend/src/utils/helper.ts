import StatusCodeEnum from "../Enums/StatusCodeEnum";
import IResponseDto from "../interfaces/Dtos/IRsponseDto";
import { ChatContent } from "../interfaces/Entities/ChatContent";

class ResponseDtoGen<T> {
    success(data?: T, message?: string): IResponseDto<T> { return { statusCode: StatusCodeEnum.Success, message, data } }
    error(message?: string, data?: T): IResponseDto<T> { return { statusCode: StatusCodeEnum.Error, message, data } }
}

function ChatContentGen(chat_id: number, user_id: number, message: string, message_sent_at: string): ChatContent {
    return {
        chat_id,
        user_id,
        message,
        message_sent_at
    }
}

function ThrowException(methodName: string, exception: any): { error: string } {
    return { error: `Exception throw on ${methodName} - ${exception.toString().replace(/(\"|\\)/gm, '')}` }
}

export { ResponseDtoGen, ChatContentGen, ThrowException }