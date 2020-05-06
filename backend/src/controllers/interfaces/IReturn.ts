import StatusCodeEnum from "../../Enums/StatusCodeEnum";

interface IReturn {
    status: StatusCodeEnum;
    message?: string;
}

export default IReturn;