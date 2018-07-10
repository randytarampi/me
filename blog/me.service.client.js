import fetch from "isomorphic-fetch";
import logger from "../logger";

export default (fetchUrl, page) => {
    return fetch(`${fetchUrl}?page=${page}`)
        .then(body => body.json())
        .catch(error => {
            logger.error(error);
            return [];
        });
};
