import fetch from "isomorphic-fetch";
import logger from "../lib/logger";

export default (fetchUrl, page) => {
    const url = `${fetchUrl}?page=${page}`;
    return fetch(url)
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
