import StatusCodeEnum from "../controllers/interfaces/StatusCodeEnum";
import IResponseDto from "../interfaces/Dtos/IRsponseDto";

export const ResponseDtoGen = {
    success(message?: string): IResponseDto { return { statusCode: StatusCodeEnum.Success, message } },
    error(message?: string): IResponseDto { return { statusCode: StatusCodeEnum.Error, message } },
}