import { Response, Status, STATUS_TEXT } from "../deps.ts";

const sendResponse = (
    response: Response,
    data: any,
    success: boolean = true,
    message: string,
    status: number = Status.OK,
): void => {
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
): void => {
    response.body = {
        success: false,
        message: STATUS_TEXT.get(status),
    };
    response.status = status;
};

const isAllRequiredFieldsAvailable = (
    payload: any, fields: string[]
): boolean => {
    for (let field of fields) {
        if (!payload.hasOwnProperty(field)) {
            return false;
        }
    }
    return true;
};

export { isAllRequiredFieldsAvailable, sendErrorResponse, sendResponse };
