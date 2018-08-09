import _ from "lodash";
import logger from "../lib/logger";
import {initializePostSources} from "./postSources";

const searchPosts = postSearchParams => {
    return initializePostSources()
        .then(postSources => {
            return Promise.all(
                postSources.map((postSource) => {
                    return postSource.getPosts(postSearchParams)
                        .catch((error) => {
                            logger.error(error);
                            return [];
                        });
                })
            );
        })
        .then(_.flatten)
        .then(flattenedPosts => {
            return _.sortBy(flattenedPosts, [
                post => -1 * (post.dateCreated ? post.dateCreated.valueOf() : post.datePublished ? post.datePublished.valueOf() : 0)
            ]);
        });
};

export default searchPosts;
