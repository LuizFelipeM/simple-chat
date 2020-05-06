import StatusCodeEnum from "../../Enums/StatusCodeEnum";

export default interface IResponseDto<T> {
    statusCode: StatusCodeEnum,
    message?: string,
    data?: T,
}