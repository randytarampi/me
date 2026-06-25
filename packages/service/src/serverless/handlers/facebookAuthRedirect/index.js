const {responseBuilder} = require("@randy.tarampi/serverless");
const logger = require("../../logger.js");
const configureEnvironment = require("../../util/configureEnvironment.js").default || require("../../util/configureEnvironment.js");
const returnErrorResponse = require("../../util/response/returnErrorResponse.js").default || require("../../util/response/returnErrorResponse.js");

module.exports = (event, context, callback) => {
    logger.debug("%s@%s handling request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

    configureEnvironment()
        .then(() => {
            callback(null, responseBuilder(null, 302, {
                Location: `https://www.facebook.com/v3.2/dialog/oauth?client_id=${process.env.FACEBOOK_API_KEY}&redirect_uri=${encodeURIComponent(process.env.FACEBOOK_AUTH_CALLBACK_URI)}&response_type=code`
            }));
        })
        .catch(returnErrorResponse(event, context, callback));
};
module.exports.default = module.exports;
