import configureEnvironment from "../util/configureEnvironment";
import responseBuilder from "../util/responseBuilder";
import returnErrorResponse from "../util/returnErrorResponse";

export default (event, context, callback) => {
    configureEnvironment()
        .then(() => {
            callback(null, responseBuilder(null, 302, {
                Location: `https://api.instagram.com/oauth/authorize/?client_id=${process.env.INSTAGRAM_API_KEY}&redirect_uri=${encodeURIComponent(process.env.INSTAGRAM_AUTH_REDIRECT_URI)}&response_type=code&scope=basic+public_content`
            }));
        })
        .catch(returnErrorResponse(callback));
};
