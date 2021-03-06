import {Photo} from "@randy.tarampi/js";
import "isomorphic-fetch";
import Unsplash, {toJson} from "unsplash-js";
import CachedDataSource from "../../cachedDataSource";
import {filterPostForOrderingConditionsInSearchParams} from "../util";

class UnsplashSource extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super(dataClient || new Unsplash({
                accessKey: process.env.UNSPLASH_API_KEY,
                secret: process.env.UNSPLASH_API_SECRET
            }),
            cacheClient);
    }

    static get type() {
        return "unsplash";
    }

    static instanceToRecord(json) {
        return Photo.fromJSON({
            raw: json,
            id: json.id,
            source: UnsplashSource.type,
            datePublished: json.created_at,
            width: json.width,
            height: json.height,
            sizedPhotos: [
                {url: json.urls.raw, width: json.width, height: json.height, size: "raw"},
                {url: json.urls.full, width: json.width, height: json.height, size: "full"},
                {url: json.urls.regular, width: 1080, size: "regular"},
                {url: json.urls.small, width: 400, size: "small"}
            ],
            sourceUrl: json.links.html,
            creator: {
                id: json.user.id,
                username: json.user.username,
                name: json.user.name,
                url: json.user.links.html,
                image: json.user.profile_image.large
            },
            locationCreated: json.location
                ? {
                    geo: json.location.position
                        ? {
                            latitude: json.location.position.latitude,
                            longitude: json.location.position.longitude
                        }
                        : null,
                    address: {
                        streetAddress: json.location.name,
                        addressLocality: json.location.city,
                        addressCountry: json.location.country
                    },
                    name: json.location.title
                }
                : null
        });
    }

    async allRecordsGetter(searchParams) {
        let posts = await this.recordsGetter(searchParams);

        if (posts.length) {
            posts = posts.concat(await this.allRecordsGetter(
                searchParams
                    .set("all", true)
                    .set("page", searchParams.page + 1)
            ));
        }

        return posts;
    }

    recordsGetter(searchParams) {
        const unsplashRequest = this.client.users.photos(process.env.UNSPLASH_USER_NAME, searchParams.Unsplash.page, searchParams.Unsplash.per_page, searchParams.Unsplash.order_by);

        return unsplashRequest
            .then(toJson)
            .then(response => Promise.all(
                response
                    .filter(post => filterPostForOrderingConditionsInSearchParams(UnsplashSource.instanceToRecord(post), searchParams))
                    .map(photo => this.recordGetter(photo.id, searchParams))
            ));
    }

    recordGetter(photoId, searchParams) {
        return this.client.photos.getPhoto(photoId, searchParams.Unsplash.width, searchParams.Unsplash.height, searchParams.Unsplash.crop)
            .then(toJson)
            .then(json => json && UnsplashSource.instanceToRecord(json));
    }
}

export default UnsplashSource;
