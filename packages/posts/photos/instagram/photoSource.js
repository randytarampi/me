import {Creator, Photo, SizedPhoto} from "@randy.tarampi/js";
import Instagram from "instagram-api";
import _ from "lodash";
import Moment from "moment";
import PhotoSource from "../photoSource";
import SearchParams from "../searchParams";

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
            .then(mediaJson => mediaJson.data
                .filter(datum => datum.type === "image")
                .map(postJson => postJson && this.jsonToPost(postJson))
            );
    }

    postGetter(photoId) {
        return this.client.media(photoId)
            .then(photoJson => photoJson && photoJson.data && this.jsonToPost(photoJson.data));
    }

    jsonToPost(photoJson) {
        const sizedPhotos = Object.keys(photoJson.images).map(key => {
            const image = photoJson.images[key];
            return new SizedPhoto(image.url, image.width, image.height, key);
        });

        const biggestOfficialPhoto = _.last(_.sortBy(sizedPhotos, ["width"]));
        const maxWidth = biggestOfficialPhoto.width < biggestOfficialPhoto.height ? 1080 * (biggestOfficialPhoto.width / biggestOfficialPhoto.height) : 1080;
        const maxHeight = biggestOfficialPhoto.height < biggestOfficialPhoto.width ? 1080 * (biggestOfficialPhoto.height / biggestOfficialPhoto.width) : 1080;

        sizedPhotos.push(new SizedPhoto(
            biggestOfficialPhoto.url,
            maxWidth,
            maxHeight,
            "maxRes"
        ));

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
