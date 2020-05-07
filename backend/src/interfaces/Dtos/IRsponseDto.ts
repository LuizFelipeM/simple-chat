import StatusCodeEnum from "../../Enums/StatusCodeEnum";

export default interface IResponseDto<T = void> {
    statusCode: StatusCodeEnum,
    message?: string,
    data?: T,
}