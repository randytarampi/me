import fetch from "isomorphic-fetch";
import getEntityForType from "../util/getEntityForType";

export default (fetchUrl, page) => {
    return fetch(`${fetchUrl}?page=${page}`)
        .then(body => body.json())
        .then(posts => {
            return posts.map((postJson) => {
                const Constructor = getEntityForType(postJson.type);
                return Constructor.fromJSON(postJson);
            });
        });
};
