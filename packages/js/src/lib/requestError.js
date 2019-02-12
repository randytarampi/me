export class RequestError extends Error {
    constructor(message, code, statusCode) {
        super(message);
        this.code = code;
        this.statusCode = statusCode || requestErrorCodeToHttpStatusCode[code];
    }

    static get codes() {
        return {
            badRequest: "EBADREQUEST",
            unauthorized: "EUNAUTHORIZED",
            forbidden: "EFORBIDDEN",
            notFound: "ENOTFOUND"
        };
    }
}

export const requestErrorCodeToHttpStatusCode = {
    [RequestError.codes.badRequest]: 400,
    [RequestError.codes.unauthorized]: 401,
    [RequestError.codes.forbidden]: 403,
    [RequestError.codes.notFound]: 404
};

export const supportedHttpStatusCodesForRequestError = Object.values(requestErrorCodeToHttpStatusCode);

export const httpStatusCodeToRequestErrorCode = Object.keys(requestErrorCodeToHttpStatusCode).reduce((statusCodeToCode, code) => {
    statusCodeToCode[requestErrorCodeToHttpStatusCode[code]] = code;
    return statusCodeToCode;
}, {});

export default RequestError;
