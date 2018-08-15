import fetch from "isomorphic-fetch";
import logger from "../lib/logger";

let fetchFunction = fetch;

export const __setFetchFunction = newFetchFunction => fetchFunction = newFetchFunction;
export const __getFetchFunction = () => fetchFunction;

export default (fetchUrl, page) => {
    const url = `${fetchUrl}?page=${page}`;
    return fetchFunction(url)
        .then(body => body.json())
        .then(posts => {
            if (!posts || !(posts instanceof Array)) {
                throw new Error(`Unexpected non-error output ${JSON.stringify(posts)} from ${url}`);
            }

            return posts;
        })
        .catch(error => {
            logger.error(error);
            return [];
        });
};
