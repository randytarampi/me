import {Photo} from "@randy.tarampi/js";
import "isomorphic-fetch";
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

    async allPostsGetter(searchParams) {
        let posts = await this.postsGetter(searchParams);

        if (posts.length) {
            posts = posts.concat(await this.allPostsGetter(
                searchParams
                    .set("all", true)
                    .set("page", searchParams.page + 1)
            ));
        }

        return posts;
    }

    postGetter(photoId, searchParams) {
        return this.client.photos.getPost(photoId, searchParams.Unsplash.width, searchParams.Unsplash.height, searchParams.Unsplash.crop)
            .then(toJson)
            .then(json => json && this.jsonToPost(json));
    }

    jsonToPost(json) {
        return Photo.fromJSON({
            id: json.id,
            source: this.type,
            datePublished: json.created_at,
            width: json.width,
            height: json.height,
            sizedPhotos: [
                {url: json.urls.raw, width: json.width, height: json.height, size: "raw"},
                {url: json.urls.full, width: json.width, height: json.height, size: "full"},
                {url: json.urls.regular, width: json.width, height: json.height, size: "regular"},
                {url: json.urls.small, width: json.width, height: json.height, size: "small"}
            ],
            sourceUrl: json.links.html,
            creator: {
                id: json.user.id,
                username: json.user.username,
                name: json.user.name,
                sourceUrl: json.user.links.html,
                imageUrl: json.user.profile_image.large
            }
        });
    }
}

export default UnsplashSource;
