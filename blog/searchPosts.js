import _ from "lodash";
import {initializePostSources} from "./postSources";

const searchWords = wordSearchParams => {
    return initializePostSources()
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
                (word) => {
                    return word.dateCreated ? word.dateCreated.valueOf() * -1 : word.datePublished ? word.datePublished.valueOf() * -1 : 0;
                }
            ]);
        });
};

export default searchWords;
