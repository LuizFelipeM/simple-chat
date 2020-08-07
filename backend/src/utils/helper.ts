import StatusCodeEnum from "../Enums/StatusCodeEnum";
import IResponseDto from "../interfaces/Dtos/IRsponseDto";
import { ChatContent } from "../interfaces/Entities/ChatContent";

class ResponseDtoGen<T> {
    success(data?: T, message?: string): IResponseDto<T> { return { statusCode: StatusCodeEnum.Success, message, data } }
    error(message?: string, data?: T): IResponseDto<T> { return { statusCode: StatusCodeEnum.Error, message, data } }
}

function ThrowException(methodName: string, exception: any): { error: string } {
    return { error: `Exception throw on ${methodName} - ${exception.toString().replace(/(\"|\\)/gm, '')}` }
}

export { ResponseDtoGen, ThrowException }