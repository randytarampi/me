import {Creator, Photo, SizedPhoto} from "@randy.tarampi/js";
import "isomorphic-fetch";
import {DateTime} from "luxon";
import Unsplash, {toJson} from "unsplash-js";
import PhotoSource from "../photoSource";

class UnsplashSource extends PhotoSource {
    constructor(dataClient, cacheClient) {
        super("Unsplash",
            dataClient || new Unsplash({
                applicationId: process.env.UNSPLASH_API_KEY,
                secret: process.env.UNSPLASH_API_SECRET
            }),
            cacheClient);
    }

    postsGetter(searchParams) {
        const unsplashRequest = this.client.users.photos(process.env.UNSPLASH_USER_NAME, searchParams.Unsplash.page, searchParams.Unsplash.per_page, searchParams.Unsplash.order_by);

        return unsplashRequest
            .then(toJson)
            .then(response => Promise.all(response.map(photo => this.jsonToPost(photo)))); // NOTE-RT: Need `that` because `toJson` uses an old school `function`
    }

    postGetter(photoId, searchParams) {
        return this.client.photos.getPost(photoId, searchParams.Unsplash.width, searchParams.Unsplash.height, searchParams.Unsplash.crop)
            .then(toJson)
            .then(json => json && this.jsonToPost(json));
    }

    jsonToPost(json) {
        return new Photo(
            json.id,
            null,
            this.type,
            DateTime.fromISO(json.created_at),
            null,
            json.width,
            json.height,
            [
                new SizedPhoto(json.urls.raw, json.width, json.height, "raw"),
                new SizedPhoto(json.urls.full, json.width, json.height, "full"),
                new SizedPhoto(json.urls.regular, json.width, json.height, "regular"),
                new SizedPhoto(json.urls.small, json.width, json.height, "small")
            ],
            json.links.html,
            null,
            null,
            new Creator(
                json.user.id,
                json.user.username,
                json.user.name,
                json.user.links.html,
                json.user.profile_image.large
            )
        );
    }
}

export default UnsplashSource;
