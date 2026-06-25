const {RequestError} = require("@randy.tarampi/js");
const {responseBuilder} = require("@randy.tarampi/serverless");
const {AuthInfoSearchParams} = require("../../../lib/authInfoSearchParams.js");
const {InstagramAuthInfo} = require("../../../lib/sources/instagram/authInfo.js");
const logger = require("../../logger.js");
const configureEnvironment = require("../../util/configureEnvironment.js").default || require("../../util/configureEnvironment.js");
const returnErrorResponse = require("../../util/response/returnErrorResponse.js").default || require("../../util/response/returnErrorResponse.js");

module.exports = (event, context, callback) => {
    logger.debug("%s@%s handling request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

    const errorHandler = returnErrorResponse(event, context, callback);
    const instagramAuthInfo = new InstagramAuthInfo();

    configureEnvironment()
        .then(() => {
            if (event.queryStringParameters && event.queryStringParameters.code) {
                return instagramAuthInfo.getRecord(event.queryStringParameters.code, new AuthInfoSearchParams({
                        clientId: process.env.INSTAGRAM_API_KEY,
                        clientSecret: process.env.INSTAGRAM_API_SECRET,
                        redirectUri: process.env.INSTAGRAM_AUTH_CALLBACK_URI,
                        code: event.queryStringParameters.code
                    }))
                    .then(token => {
                        callback(null, responseBuilder(token));
                    });
            } else {
                return errorHandler(new RequestError("Tried to handle Instagram authentication response, but no `code` was received", RequestError.codes.badRequest));
            }
        })
        .catch(errorHandler);
};
module.exports.default = module.exports;
