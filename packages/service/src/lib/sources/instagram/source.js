import {Gallery, Photo, SizedPhoto} from "@randy.tarampi/js";
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

    static instanceToRecord(postJson) {
        const {_ig: igJson} = postJson;

        if (igJson) {
            switch (igJson.type) {
                case "carousel":
                    return InstagramSource._jsonToGallery(postJson);

                case "image":
                    return InstagramSource._jsonToPhoto(postJson);
            }
        }

        if (!postJson.images) {
            return null;
        }

        return InstagramSource._oldJsonToPhoto(postJson);
    }

    static _oldJsonToPhoto(postJson) {
        const sizedPhotos = Object.keys(postJson.images).map(key => {
            const image = postJson.images[key];
            return SizedPhoto.fromJSON({...image, size: key});
        });

        const biggestOfficialPhoto = _.last(_.sortBy(sizedPhotos, ["width"]));

        return Photo.fromJS({
            raw: postJson,
            id: postJson.id,
            source: InstagramSource.type,
            datePublished: DateTime.fromMillis(parseInt(postJson.created_time, 10) * 1000),
            width: biggestOfficialPhoto.width,
            height: biggestOfficialPhoto.height,
            sizedPhotos,
            sourceUrl: postJson.link,
            title: postJson.location && postJson.location.name,
            body: postJson.caption && postJson.caption.text,
            creator: {
                id: postJson.user.id,
                username: postJson.user.username,
                name: postJson.user.full_name,
                url: `https://www.instagram.com/${postJson.user.username}`,
                image: postJson.user.profile_picture
            },
            tags: postJson.tags,
            locationCreated: postJson.location
                ? {
                    geo: {
                        latitude: postJson.location.latitude,
                        longitude: postJson.location.longitude
                    },
                    address: {
                        streetAddress: postJson.location.street_address
                    },
                    name: postJson.location.name
                }
                : null
        });
    }

    static _jsonToPhoto(postJson) {
        const {_ig: igJson, _graph: graphJson} = postJson;
        const graphJsonImages = graphJson.graphql.shortcode_media.display_resources;
        const sizedPhotos = Object.keys(graphJsonImages).map(key => {
            const {config_width: width, config_height: height, src: url, ...image} = graphJsonImages[key];
            return SizedPhoto.fromJSON({
                width,
                height,
                url,
                ...image,
                size: width
            });
        });

        const biggestOfficialPhoto = _.last(_.sortBy(sizedPhotos, ["width"]));

        return Photo.fromJS({
            raw: postJson,
            id: igJson.id,
            source: InstagramSource.type,
            datePublished: DateTime.fromMillis(parseInt(igJson.created_time, 10) * 1000),
            width: biggestOfficialPhoto.width,
            height: biggestOfficialPhoto.height,
            sizedPhotos,
            sourceUrl: igJson.link,
            title: igJson.location && igJson.location.name,
            body: igJson.caption && igJson.caption.text,
            creator: {
                id: igJson.user.id,
                username: igJson.user.username,
                name: igJson.user.full_name,
                url: `https://www.instagram.com/${igJson.user.username}`,
                image: igJson.user.profile_picture
            },
            tags: igJson.tags,
            locationCreated: igJson.location
                ? {
                    geo: {
                        latitude: igJson.location.latitude,
                        longitude: igJson.location.longitude
                    },
                    address: {
                        streetAddress: igJson.location.street_address
                    },
                    name: igJson.location.name
                }
                : null
        });
    }

    static _jsonToGallery(postJson) {
        const {_ig: igJson, _graph: graphJson} = postJson;

        return Gallery.fromJS({
            raw: postJson,
            id: igJson.id,
            source: InstagramSource.type,
            datePublished: DateTime.fromMillis(parseInt(igJson.created_time, 10) * 1000),
            sourceUrl: igJson.link,
            title: igJson.location && igJson.location.name,
            body: igJson.caption && igJson.caption.text,
            creator: {
                id: igJson.user.id,
                username: igJson.user.username,
                name: igJson.user.full_name,
                url: `https://www.instagram.com/${igJson.user.username}`,
                image: igJson.user.profile_picture
            },
            tags: igJson.tags,
            locationCreated: igJson.location
                ? {
                    geo: {
                        latitude: igJson.location.latitude,
                        longitude: igJson.location.longitude
                    },
                    address: {
                        streetAddress: igJson.location.street_address
                    },
                    name: igJson.location.name
                }
                : null,
            photos: graphJson.graphql.shortcode_media.edge_sidecar_to_children.edges
                .map(edgeJson => InstagramSource._jsonToPhoto({
                    _ig: igJson,
                    _graph: {
                        graphql: {
                            shortcode_media: edgeJson.node
                        }
                    }
                }))
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

    _highResolutionPhotoGetter(igJson) {
        return fetch(`${igJson.link}?__a=1`)
            .then(body => body.json())
            .then(graphJson => {
                return {
                    _ig: igJson,
                    _graph: graphJson
                };
            });
    }

    recordsGetter(searchParams) {
        return this.client.userSelfMedia(searchParams.Instagram)
            .then(mediaJson => Promise.all(
                mediaJson.data
                    .filter(postJson => filterPostForOrderingConditionsInSearchParams(this.constructor.instanceToRecord(postJson), searchParams))
                    .map(postJson => postJson && this._highResolutionPhotoGetter(postJson).then(igAndGraphJson => this.constructor.instanceToRecord(igAndGraphJson)))
            ))
            .then(_.compact);
    }

    recordGetter(photoId) {
        return this.client.media(photoId)
            .then(postJson => postJson && postJson.data && this._highResolutionPhotoGetter(postJson.data).then(post => this.constructor.instanceToRecord(post)));
    }
}

export default InstagramSource;
