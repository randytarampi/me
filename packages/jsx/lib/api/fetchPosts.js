import {util} from "@randy.tarampi/js";
import fetch from "isomorphic-fetch";
import queryString from "query-string";

export default (fetchUrl, searchParams) => {
    const parsedFetchUrl = queryString.parseUrl(fetchUrl);
    return fetch(`${parsedFetchUrl.url}?${queryString.stringify({
        ...parsedFetchUrl.query,
        ...searchParams
    })}`, {
        headers: {
            "Accept": "application/json",
            "Accept-Charset": "utf-8",
            "ME-API-VERSION": 2
        }
    })
        .then(body => body.json())
        .then(postsResponse => {
            return {
                ...postsResponse,
                posts: postsResponse.posts.map(postJson => {
                    const Constructor = util.getEntityForType(postJson.type);
                    return Constructor.fromJSON(postJson);
                })
            };
        });
};
