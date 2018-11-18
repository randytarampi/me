import {Photo, SizedPhoto} from "@randy.tarampi/js";
import Instagram from "instagram-api";
import fetch from "isomorphic-fetch";
import _ from "lodash";
import {DateTime} from "luxon";
import CachedDataSource from "../../cachedDataSource";

class InstagramSource extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super("Instagram",
            dataClient || new Instagram(process.env.INSTAGRAM_ACCESS_TOKEN),
            cacheClient
        );
    }

    get isEnabled() {
        return !!process.env[`${this.type.toUpperCase()}_ACCESS_TOKEN`];
    }

    postsGetter(searchParams) {
        const userId = process.env.INSTAGRAM_USER_ID;
        let instagramRequest = Promise.resolve(userId);

        if (!userId) {
            instagramRequest = this.client.userSearch(process.env.INSTAGRAM_USER_NAME)
                .then(userJson => {
                    const user = userJson.data.find(datum => datum.username === process.env.INSTAGRAM_USER_NAME);
                    return user && user.id;
                });
        }

        return instagramRequest
            .then(userId => this.client.userMedia(userId, searchParams.Instagram))
            .then(mediaJson => Promise.all(
                mediaJson.data
                    .filter(datum => datum.type === "image")
                    .map(postJson => postJson && this._highResolutionPhotoGetter(postJson).then(post => this.jsonToPost(post)))
            ));
    }

    async allPostsGetter(searchParams) {
        let posts = await this.postsGetter(searchParams);

        if (posts.length) {
            const lastPost = posts[posts.length - 1];
            posts = posts.concat(await this.allPostsGetter(
                searchParams
                    .set("all", true)
                    .set("beforeId", lastPost.id)
            ));
        }

        return posts;
    }

    postGetter(photoId) {
        return this.client.media(photoId)
            .then(postJson => postJson && postJson.data && this._highResolutionPhotoGetter(postJson.data).then(post => this.jsonToPost(post)));
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

    jsonToPost(photoJson) {
        const sizedPhotos = Object.keys(photoJson.images).map(key => {
            const image = photoJson.images[key];
            return SizedPhoto.fromJSON({...image, size: key});
        });

        const biggestOfficialPhoto = _.last(_.sortBy(sizedPhotos, ["width"]));

        return Photo.fromJS({
            raw: photoJson,
            id: photoJson.id,
            source: this.type,
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
            }
        });
    }
}

export default InstagramSource;
