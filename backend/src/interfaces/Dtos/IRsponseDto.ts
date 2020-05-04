import StatusCodeEnum from "../../controllers/interfaces/StatusCodeEnum";

export default interface IResponseDto {
    statusCode: StatusCodeEnum,
    message?: string,
    data?: any,
}