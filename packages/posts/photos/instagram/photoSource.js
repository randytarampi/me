import {Creator, Photo, SizedPhoto} from "@randy.tarampi/js";
import Instagram from "instagram-api";
import fetch from "isomorphic-fetch";
import _ from "lodash";
import Moment from "moment";
import PhotoSource from "../photoSource";
import SearchParams from "../../lib/searchParams";

class InstagramSource extends PhotoSource {
    constructor(dataClient, cacheClient) {
        super("Instagram",
            dataClient || new Instagram(process.env.INSTAGRAM_ACCESS_TOKEN),
            cacheClient
        );
    }

    get isEnabled() {
        return !!process.env[`${this.type.toUpperCase()}_ACCESS_TOKEN`];
    }

    postsGetter(params) {
        params = params instanceof SearchParams ? params : new SearchParams(params);

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
            .then(userId => this.client.userMedia(userId, params.Instagram))
            .then(mediaJson => Promise.all(
                mediaJson.data
                .filter(datum => datum.type === "image")
                    .map(postJson => postJson && this._highResolutionPhotoGetter(postJson).then(post => this.jsonToPost(post)))
            ));
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
            return new SizedPhoto(image.url, image.width, image.height, key);
        });

        const biggestOfficialPhoto = _.last(_.sortBy(sizedPhotos, ["width"]));

        return new Photo(
            photoJson.id,
            null,
            this.type,
            Moment(parseInt(photoJson.created_time, 10) * 1000),
            null,
            biggestOfficialPhoto.width,
            biggestOfficialPhoto.height,
            sizedPhotos,
            photoJson.link,
            photoJson.location && photoJson.location.name,
            photoJson.caption && photoJson.caption.text,
            new Creator(
                photoJson.user.username,
                photoJson.user.username,
                photoJson.user.full_name,
                `https://www.instagram.com/${photoJson.user.username}`
            )
        );
    }
}

export default InstagramSource;
