import {Photo, SizedPhoto} from "@randy.tarampi/js";
import Instagram from "instagram-api";
import fetch from "isomorphic-fetch";
import _ from "lodash";
import {DateTime} from "luxon";
import {AuthInfo} from "../../authInfo";
import CachedDataSource from "../../cachedDataSource";
import {filterPostForOrderingConditionsInSearchParams} from "../util";
import {InstagramAuthInfo} from "./authInfo";
import {type} from "./util";

export class InstagramSource extends CachedDataSource {
    constructor(dataClient, cacheClient, authInfo) {
        authInfo = authInfo || new AuthInfo({token: process.env.INSTAGRAM_ACCESS_TOKEN});
        super(dataClient || new Instagram(authInfo.token), cacheClient);

        this.authInfo = authInfo;
    }

    static get AuthInfoClient() {
        return InstagramAuthInfo;
    }

    static get type() {
        return type;
    }

    get isEnabled() {
        return !!(this.authInfo && this.authInfo.token);
    }

    static instanceToRecord(photoJson) {
        const sizedPhotos = Object.keys(photoJson.images).map(key => {
            const image = photoJson.images[key];
            return SizedPhoto.fromJSON({...image, size: key});
        });

        const biggestOfficialPhoto = _.last(_.sortBy(sizedPhotos, ["width"]));

        return Photo.fromJS({
            raw: photoJson,
            id: photoJson.id,
            source: InstagramSource.type,
            datePublished: DateTime.fromMillis(parseInt(photoJson.created_time, 10) * 1000),
            width: biggestOfficialPhoto.width,
            height: biggestOfficialPhoto.height,
            sizedPhotos,
            sourceUrl: photoJson.link,
            title: photoJson.location && photoJson.location.name,
            body: photoJson.caption && photoJson.caption.text,
            creator: {
                id: photoJson.user.id,
                username: photoJson.user.username,
                name: photoJson.user.full_name,
                url: `https://www.instagram.com/${photoJson.user.username}`,
                image: photoJson.user.profile_picture
            },
            tags: photoJson.tags,
            locationCreated: photoJson.location
                ? {
                    geo: {
                        latitude: photoJson.location.latitude,
                        longitude: photoJson.location.longitude
                    },
                    address: {
                        streetAddress: photoJson.location.street_address
                    },
                    name: photoJson.location.name
                }
                : null
        });
    }

    async allRecordsGetter(searchParams) {
        let posts = await this.recordsGetter(searchParams);

        if (posts.length) {
            const lastPost = posts[posts.length - 1];
            posts = posts.concat(await this.allRecordsGetter(
                searchParams
                    .set("all", true)
                    .set("beforeId", lastPost.id)
            ));
        }

        return posts;
    }

    _highResolutionPhotoGetter(photoJson) {
        return fetch(`${photoJson.link}?__a=1`)
            .then(body => body.json())
            .then(graphPhotoJson => {
                const graphPhotoUrl = graphPhotoJson.graphql.shortcode_media.display_url;
                const graphPhotoDimensions = graphPhotoJson.graphql.shortcode_media.dimensions;
                photoJson.images.maxRes = {
                    ...graphPhotoDimensions,
                    url: graphPhotoUrl
                };
                return photoJson;
            });
    }

    recordsGetter(searchParams) {
        return this.client.userSelfMedia(searchParams.Instagram)
            .then(mediaJson => Promise.all(
                mediaJson.data
                    .filter(datum => datum.type === "image")
                    .filter(postJson => filterPostForOrderingConditionsInSearchParams(this.constructor.instanceToRecord(postJson), searchParams))
                    .map(postJson => postJson && this._highResolutionPhotoGetter(postJson).then(post => this.constructor.instanceToRecord(post)))
            ));
    }

    recordGetter(photoId) {
        return this.client.media(photoId)
            .then(postJson => postJson && postJson.data && this._highResolutionPhotoGetter(postJson.data).then(post => this.constructor.instanceToRecord(post)));
    }
}

export default InstagramSource;
