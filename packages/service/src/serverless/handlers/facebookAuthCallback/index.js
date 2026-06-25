const {RequestError} = require("@randy.tarampi/js");
const {responseBuilder} = require("@randy.tarampi/serverless");
const {AuthInfoSearchParams} = require("../../../lib/authInfoSearchParams.js");
const {FacebookAuthInfo} = require("../../../lib/sources/facebook/authInfo.js");
const logger = require("../../logger.js");
const configureEnvironment = require("../../util/configureEnvironment.js").default || require("../../util/configureEnvironment.js");
const returnErrorResponse = require("../../util/response/returnErrorResponse.js").default || require("../../util/response/returnErrorResponse.js");

module.exports = (event, context, callback) => {
    logger.debug("%s@%s handling request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

    const errorHandler = returnErrorResponse(event, context, callback);
    const facebookAuthInfo = new FacebookAuthInfo();

    configureEnvironment()
        .then(() => {
            if (event.queryStringParameters && event.queryStringParameters.code) {
                return facebookAuthInfo.getRecord(event.queryStringParameters.code, new AuthInfoSearchParams({
                        clientId: process.env.FACEBOOK_API_KEY,
                        clientSecret: process.env.FACEBOOK_API_SECRET,
                        redirectUri: process.env.FACEBOOK_AUTH_CALLBACK_URI,
                        code: event.queryStringParameters.code
                    }))
                    .then(token => {
                        callback(null, responseBuilder(token));
                    });
            } else {
                return errorHandler(new RequestError("Tried to handle Facebook authentication response, but no `code` was received", RequestError.codes.badRequest));
            }
        })
        .catch(errorHandler);
};
module.exports.default = module.exports;
