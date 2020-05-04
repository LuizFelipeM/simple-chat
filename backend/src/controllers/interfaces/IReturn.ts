import StatusCodeEnum from "./StatusCodeEnum";

interface IReturn {
    status: StatusCodeEnum;
    message?: string;
}

export default IReturn;