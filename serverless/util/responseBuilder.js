const responseBuilder = (body = undefined, statusCode = 200, headers = {}, bodyEncoding = "text", statusDescription = undefined) => {
    return {
        body: body && JSON.stringify(body),
        bodyEncoding,
        headers,
        statusCode,
        statusDescription
    };
};

export default responseBuilder;
