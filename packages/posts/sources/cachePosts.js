import logger from "../lib/logger";
import {initializeSources} from "./";

export const cachePosts = searchParams => {
    return initializeSources()
        .then(initializedSources => Promise.all(initializedSources.map(postSource => {
            return postSource.getAllServicePosts(searchParams)
                .catch(error => {
                    logger.error(error);
                    return [];
                });
        })));
};

export default cachePosts;
