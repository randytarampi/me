import {initializeSources} from ".";
import logger from "../logger";

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
