import fetch from "isomorphic-fetch";
import {util} from "@randy.tarampi/js";

export default (fetchUrl, page) => {
    return fetch(`${fetchUrl}?page=${page}`)
        .then(body => body.json())
        .then(posts => {
            return posts.map((postJson) => {
                const Constructor = util.getEntityForType(postJson.type);
                return Constructor.fromJSON(postJson);
            });
        });
};
