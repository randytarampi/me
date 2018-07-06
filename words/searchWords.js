import _ from "lodash";
import {initializeWordSources} from "./wordSources";

const searchWords = wordSearchParams => {
    return initializeWordSources()
        .then(wordSources => {
            return Promise.all(
                wordSources.map((wordSource) => {
                    return wordSource.getWordPosts(wordSearchParams)
                        .catch((error) => {
                            console.error(error); // eslint-disable-line no-console
                            return [];
                        });
                })
            );
        })
        .then(_.flatten)
        .then(flattenedWords => {
            return _.sortBy(flattenedWords, [
                post => -1 * (post.dateCreated ? post.dateCreated.valueOf() : post.datePublished.valueOf())
            ]);
        });
};

export default searchWords;
