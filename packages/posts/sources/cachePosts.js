import logger from "../lib/logger";
import initializedSources from "./";

const cachePosts = searchParams => {
    return initializedSources
        .then(initializedSources => Promise.all(initializedSources.map(postSource => {
            return postSource.getAllServicePosts(searchParams)
                .catch(error => {
                    logger.error(error);
                    return [];
                });
        })));
};

export default cachePosts;
