const responseBuilder = (body = undefined, statusCode = 200, headers = {}, isBase64Encoded = false) => {
    return {
        body: body && JSON.stringify(body),
        isBase64Encoded,
        headers: {
            "Access-Control-Allow-Origin": "*", // NOTE-RT: Ideally this is injected in from the environment, but `*` suffices at this hour
            "Access-Control-Allow-Credentials": true,
            ...headers
        },
        statusCode
    };
};

export default responseBuilder;
