export const codes = {
    badRequest: "EBADREQUEST"
};

export const codeToStatusCode = {
    [codes.badRequest]: 400
};

class RequestError extends Error {
    constructor(message, code, statusCode) {
        super(message);
        this.code = code;
        this.statusCode = statusCode || codeToStatusCode[code];
    }
}

export default RequestError;
