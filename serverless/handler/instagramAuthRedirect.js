import loadServerlessSecrets from "../util/loadServerlessSecrets";
import responseBuilder from "../util/responseBuilder";
import returnErrorResponse from "../util/returnErrorResponse";

export default (event, context, callback) => {
    loadServerlessSecrets()
        .then(() => {
            callback(null, responseBuilder(null, 302, {
                location: `https://api.instagram.com/oauth/authorize/?client_id=${process.env.INSTAGRAM_API_KEY}&redirect_uri=${encodeURIComponent(process.env.INSTAGRAM_AUTH_REDIRECT_URI)}&response_type=code&scope=basic+public_content`
            }));
        })
        .catch(returnErrorResponse(callback));
};
