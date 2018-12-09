import {getEntityForType, Post} from "@randy.tarampi/js";
import {logger} from "@randy.tarampi/browser-logger";
import fetch from "isomorphic-fetch";
import queryString from "query-string";

export const fetchPostsApi = (fetchUrl, searchParams) => {
    const parsedFetchUrl = queryString.parseUrl(fetchUrl);
    return fetch(`${parsedFetchUrl.url}?${queryString.stringify({
        ...parsedFetchUrl.query,
        ...searchParams
    })}`, {
        headers: {
            "Accept": "application/json",
            "Accept-Charset": "utf-8",
            "ME-API-VERSION": 3
        }
    })
        .then(body => body.json())
        .then(postsResponse => {
            return {
                ...postsResponse,
                posts: postsResponse.posts.map(postJson => {
                    let Constructor;

                    try {
                        Constructor = getEntityForType(postJson.type);
                    } catch (error) {
                        logger.warn(error, `Can't \`getComponentForType\` for \`${postJson.type}\`, just using \`Post\` instead\``);
                        Constructor = Post;
                    }

                    return Constructor.fromJSON(postJson);
                })
            };
        });
};

export default fetchPostsApi;
