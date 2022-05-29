import { Response, Status, STATUS_TEXT } from "../deps.ts";

const sendResponse = (
    response: Response,
    data: any,
    success: boolean = true,
    message: string,
    status: number = Status.OK,
) => {
    response.body = {
        success,
        message,
        ...(data && { data }),
    };
    response.status = status;
};

const sendErrorResponse = (
    response: Response,
    status: number = Status.InternalServerError,
) => {
    response.body = {
        success: false,
        message: STATUS_TEXT.get(status),
    };
    response.status = status;
};

export { sendErrorResponse, sendResponse };
