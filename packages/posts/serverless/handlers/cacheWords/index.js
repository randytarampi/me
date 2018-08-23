import {Post} from "@randy.tarampi/js";
import SearchParams from "../../../lib/searchParams";
import cacheWords from "../../../words/cacheWords";
import configureEnvironment from "../../util/configureEnvironment";
import responseBuilder from "../../util/response/responseBuilder";
import returnErrorResponse from "../../util/response/returnErrorResponse";

export default (event, context, callback) => {
    configureEnvironment()
        .then(() => {
            return cacheWords(SearchParams.fromJS({
                type: Post.name,
                ...(event.body || event.queryStringParameters)
            }))
                .then(sortedWords => callback(null, responseBuilder(sortedWords)));
        })
        .catch(returnErrorResponse(callback));
};
