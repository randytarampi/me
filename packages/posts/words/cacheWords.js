import logger from "../lib/logger";
import {initializeWordSources} from "./wordSources";

const cacheWords = wordSearchParams => {
    return initializeWordSources()
        .then(wordSources => {
            return Promise.all(
                wordSources.map((wordSource) => {
                    return wordSource.getServicePosts(wordSearchParams)
                        .catch((error) => {
                            logger.error(error);
                            return [];
                        });
                })
            );
        });
};

export default cacheWords;
