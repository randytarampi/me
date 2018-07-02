import searchWords from "../../words/searchWords";
import loadServerlessSecrets from "../util/loadServerlessSecrets";
import responseBuilder from "../util/responseBuilder";
import returnErrorResponse from "../util/returnErrorResponse";

export default (event, context, callback) => {
    loadServerlessSecrets()
        .then(() => {
            return searchWords(event.queryStringParameters)
                .then(sortedWords => callback(null, responseBuilder(sortedWords)));
        })
        .catch(returnErrorResponse(callback));
};
