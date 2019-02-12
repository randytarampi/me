import mime from "mime-types";

const jsonMimeTypes = [mime.types.json];

const defaultHeaders = {
    "Access-Control-Allow-Origin": "*", // NOTE-RT: Ideally this is injected in from the environment, but `*` suffices at this hour
    "Access-Control-Allow-Credentials": true,
    "Content-Type": mime.types.json,
    "Content-Encoding": "utf-8"
};

/**
 * Build an AWS API Gateway HTTP response
 * @param body {*}
 * @param statusCode {number}
 * @param passedHeaders {Object}
 * @param isBase64Encoded {boolean}
 * @returns {{body: (undefined|string), isBase64Encoded: boolean, headers: object, statusCode: number}}
 */
export const responseBuilder = (body = undefined, statusCode = 200, passedHeaders = defaultHeaders, isBase64Encoded = false) => {
    let properBody = body;
    const headers = {
        ...defaultHeaders,
        ...passedHeaders
    };

    if (headers) {
        if (jsonMimeTypes.includes(headers["Content-Type"])) {
            properBody = body && JSON.stringify(body);
        }
    }

    return {
        body: properBody,
        isBase64Encoded,
        headers,
        statusCode
    };
};

export default responseBuilder;
