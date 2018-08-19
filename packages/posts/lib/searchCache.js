import CacheClient from "./cacheClient";
import logger from "./logger/index";

const searchCache = searchParams => {
    const cacheClient = new CacheClient();

    return cacheClient.getPosts(searchParams)
        .catch(error => {
            logger.error(error, `[searchCache] error for ${JSON.stringify(searchParams)}, just returning \`[]\``);
            return [];
        });
};

export default searchCache;
