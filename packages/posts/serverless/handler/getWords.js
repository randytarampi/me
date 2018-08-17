import searchWords from "../../words/searchWords";
import configureEnvironment from "../util/configureEnvironment";
import responseBuilder from "../util/responseBuilder";
import returnErrorResponse from "../util/returnErrorResponse";

export default (event, context, callback) => {
    if (event.source === "serverless-plugin-warmup") {
        return callback(null, "Lambda is warm!");
    }
    
    configureEnvironment()
        .then(() => {
            return searchWords(event.queryStringParameters)
                .then(sortedWords => callback(null, responseBuilder(sortedWords)));
        })
        .catch(returnErrorResponse(callback));
};
