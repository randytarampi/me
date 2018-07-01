const responseBuilder = (body = undefined, statusCode = 200, headers = {}, isBase64Encoded = false) => {
    return {
        body: body && JSON.stringify(body),
        isBase64Encoded,
        headers,
        statusCode
    };
};

export default responseBuilder;
