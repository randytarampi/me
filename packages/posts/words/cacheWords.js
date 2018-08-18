import _ from "lodash";
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
        })
        .then(_.flatten)
        .then(flattenedWords => {
            return _.sortBy(flattenedWords, [
                post => -1 * (post.dateCreated ? post.dateCreated.valueOf() : post.datePublished ? post.datePublished.valueOf() : 0)
            ]);
        });
};

export default cacheWords;
