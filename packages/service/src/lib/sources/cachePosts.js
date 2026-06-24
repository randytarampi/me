import {initializeSources} from "./index.js";
import logger from "../../serverless/logger.js";

export const cachePosts = (searchParams, postSources) => {
    return initializeSources(postSources)
        .then(initializedSources => Promise.all(initializedSources.map(postSource => {
            return postSource.getAllServiceRecords(searchParams)
                .catch(error => {
                    logger.error(error);
                    return [];
                });
        })));
};

export default cachePosts;
