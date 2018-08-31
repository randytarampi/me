import logger from "../lib/logger";
import {initializeSources} from "./sources";

const cachePosts = photoSearchParams => {
    return initializeSources()
        .then(sources => {
            return Promise.all(
                sources.map((postSource) => {
                    return postSource.getAllServicePosts(photoSearchParams)
                        .catch((error) => {
                            logger.error(error);
                            return [];
                        });
                })
            );
        });
};

export default cachePosts;
