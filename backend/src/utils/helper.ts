import StatusCodeEnum from "../Enums/StatusCodeEnum";
import IResponseDto from "../interfaces/Dtos/IRsponseDto";

class ResponseDtoGen<T> {
    success(data?: T, message?: string): IResponseDto<T> { return { statusCode: StatusCodeEnum.Success, message, data } }
    error(message?: string, data?: T): IResponseDto<T> { return { statusCode: StatusCodeEnum.Error, message, data } }
}

export default ResponseDtoGen