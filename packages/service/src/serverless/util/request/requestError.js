export const codes = {
    badRequest: "EBADREQUEST"
};

export const codeToStatusCode = {
    [codes.badRequest]: 400
};

export const statusCodeToCode = Object.keys(codeToStatusCode).reduce((statusCodeToCode, code) => {
    statusCodeToCode[codeToStatusCode[code]] = code;
    return statusCodeToCode;
}, {});

export const supportedStatusCodes = Object.values(codeToStatusCode);

export class RequestError extends Error {
    constructor(message, code, statusCode) {
        super(message);
        this.code = code;
        this.statusCode = statusCode || codeToStatusCode[code];
    }
}

export default RequestError;
