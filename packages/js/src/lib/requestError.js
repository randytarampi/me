// @ts-check

/** Error wrapper for request failures with a code and HTTP status. */
export class RequestError extends Error {
    /**
     * @param {string} message - What blew up.
     * @param {string} code - The app error code.
     * @param {number} [statusCode] - Optional HTTP status override.
     */
    constructor(message, code, statusCode) {
        super(message);
        this.code = code;
        this.statusCode = statusCode || requestErrorCodeToHttpStatusCode[code];
    }

    /**
     * @returns {{badRequest: string, unauthorized: string, forbidden: string, notFound: string}} The built-in codes.
     */
    static get codes() {
        return {
            badRequest: "EBADREQUEST",
            unauthorized: "EUNAUTHORIZED",
            forbidden: "EFORBIDDEN",
            notFound: "ENOTFOUND"
        };
    }
}

/** @type {Record<string, number>} */
export const requestErrorCodeToHttpStatusCode = {
    [RequestError.codes.badRequest]: 400,
    [RequestError.codes.unauthorized]: 401,
    [RequestError.codes.forbidden]: 403,
    [RequestError.codes.notFound]: 404
};

/** @type {number[]} */
export const supportedHttpStatusCodesForRequestError = Object.values(requestErrorCodeToHttpStatusCode);

/** @type {Record<number, string>} */
export const httpStatusCodeToRequestErrorCode = Object.keys(requestErrorCodeToHttpStatusCode).reduce((statusCodeToCode, code) => {
    statusCodeToCode[requestErrorCodeToHttpStatusCode[code]] = code;
    return statusCodeToCode;
}, {});

export default RequestError;
