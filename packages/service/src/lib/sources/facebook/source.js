import {Gallery, LinkPost, Photo, Post, POST_STATUS} from "@randy.tarampi/js";
import _ from "lodash";
import logger from "../../../serverless/logger";
import {AuthInfo} from "../../authInfo";
import CachedDataSource from "../../cachedDataSource";
import {filterPostForOrderingConditionsInSearchParams} from "../util";
import {FacebookAuthInfo} from "./authInfo";
import {FacebookApiClient} from "./client";
import {type} from "./util";

const fbPostJsonToLocationCreated = ({place}) => {
    if (place) {
        const {name, location} = place;

        return {
            name,
            geo: {
                latitude: location.latitude,
                longitude: location.longitude
            },
            address: {
                postalCode: location.zip,
                street: location.streetAddress,
                addressLocality: location.city,
                addressRegion: location.state || location.region,
                addressCountry: location.country,
                countryCode: location.country_code
            }
        };
    }

    return null;
};

const fbPostJsonToPostJson = postJson => {
    return {
        raw: postJson,
        id: postJson.id,
        source: FacebookSource.type,
        datePublished: postJson.created_time,
        sourceUrl: postJson.permalink_url,
        title: postJson.name,
        body: postJson.message,
        creator: postJson.from && {
            network: FacebookSource.type,
            id: postJson.from.id,
            name: postJson.from.name,
            url: `https://facebook.com/profile.php?id=${postJson.from.id}`
        },
        locationCreated: fbPostJsonToLocationCreated(postJson),
        status: !postJson.privacy || postJson.privacy.value === "EVERYONE"
            ? POST_STATUS.visible
            : POST_STATUS.hidden
    };
};

export class FacebookSource extends CachedDataSource {
    constructor(dataClient, cacheClient, authInfo) {
        authInfo = authInfo || new AuthInfo({token: process.env.FACEBOOK_ACCESS_TOKEN});
        super(dataClient || new FacebookApiClient(authInfo.token), cacheClient);

        this.authInfo = authInfo;
    }

    static get AuthInfoClient() {
        return FacebookAuthInfo;
    }

    static get type() {
        return type;
    }

    get isEnabled() {
        return !!(this.authInfo && this.authInfo.token);
    }

    static instanceToRecord(postJson) {
        switch (postJson.type) {
            case "link":
                return FacebookSource._jsonToLinkPost(postJson);

            case "photo": {
                const {attachments: {data}} = postJson;
                const attachment = data[0];

                switch (attachment.type) {
                    case "album":
                        return FacebookSource._jsonToGallery(postJson);

                    case "photo":
                    default:
                        return FacebookSource._jsonToPhoto(postJson);
                }
            }

            default:
                return FacebookSource._jsonToPost(postJson);
        }
    }

    static _jsonToLinkPost(postJson) {
        const linkJson = postJson.attachments.data[0];

        return LinkPost.fromJSON({
            ...fbPostJsonToPostJson(postJson),
            title: null,
            linkTitle: linkJson.title,
            linkBody: linkJson.description,
            linkSourceUrl: linkJson.url
        });
    }

    static _jsonToPost(postJson) {
        return Post.fromJSON(fbPostJsonToPostJson(postJson));
    }

    static _jsonToPhoto(postJson) {
        const {attachments: {data}} = postJson;
        const photoAttachment = data[0];
        const sizedPhotos = [
            {
                width: photoAttachment.media.image.width,
                height: photoAttachment.media.image.height,
                url: photoAttachment.media.image.src,
                size: photoAttachment.media.image.width
            }
        ];
        const biggestOfficialPhoto = _.last(_.sortBy(sizedPhotos, ["width"]));

        return Photo.fromJSON({
            ...fbPostJsonToPostJson(postJson),
            sourceUrl: photoAttachment.url,
            width: biggestOfficialPhoto.width,
            height: biggestOfficialPhoto.height,
            sizedPhotos
        });
    }

    static _jsonToGallery(postJson) {
        const {attachments: {data}} = postJson;
        const galleryAttachment = data[0];

        return Gallery.fromJS({
            ...fbPostJsonToPostJson(postJson),
            sourceUrl: galleryAttachment.url,
            photos: galleryAttachment.subattachments.data.map(photoAttachment => {
                return FacebookSource._jsonToPhoto({
                    ...postJson,
                    permalink_url: photoAttachment.url,
                    description: photoAttachment.description,
                    attachments: {
                        data: [
                            photoAttachment
                        ]
                    }
                }).toJS();
            })
        });
    }

    async allRecordsGetter(searchParams) {
        let posts = await this.recordsGetter(searchParams).catch(error => {
            logger.error(error, "allRecordsGetter probably got rate limited");

            return [];
        });

        if (posts.length) {
            const lastPost = posts[posts.length - 1];
            posts = posts.concat(await this.allRecordsGetter(
                searchParams
                    .set("all", true)
                    .set("beforeDate", lastPost.datePublished)
            ));
        }

        return posts;
    }

    recordsGetter(searchParams) {
        logger.trace(`recordsGetter for ${JSON.stringify(searchParams.Facebook)}`);
        return this.client.get("me/feed", searchParams.Facebook)
            .then(postsResponse => postsResponse.data && Promise.all(
                postsResponse.data
                    .filter(postJson => filterPostForOrderingConditionsInSearchParams(this.constructor.instanceToRecord(postJson), searchParams))
                    .map(postJson => postJson && this.constructor.instanceToRecord(postJson))
            ))
            .then(_.compact);
    }

    recordGetter(postId) {
        return this.client.get(postId)
            .then(postsResponse => postsResponse.data && this.constructor.instanceToRecord(postsResponse.data));
    }
}

export default FacebookSource;
