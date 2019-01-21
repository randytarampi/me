import logger from "../../../lib/logger";
import configureEnvironment from "../../util/configureEnvironment";
import responseBuilder from "../../util/response/responseBuilder";
import returnErrorResponse from "../../util/response/returnErrorResponse";

export default (event, context, callback) => {
    logger.debug("%s@%s handling request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

    configureEnvironment()
        .then(() => {
            callback(null, responseBuilder(null, 302, {
                Location: `https://api.instagram.com/oauth/authorize/?client_id=${process.env.INSTAGRAM_API_KEY}&redirect_uri=${encodeURIComponent(process.env.INSTAGRAM_AUTH_CALLBACK_URI)}&response_type=code&scope=basic+public_content`
            }));
        })
        .catch(returnErrorResponse(event, context, callback));
};
