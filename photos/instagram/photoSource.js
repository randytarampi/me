import Instagram from "instagram-api";
import _ from "lodash";
import Creator from "me.common.js/lib/creator";
import Photo from "me.common.js/lib/photo";
import SizedPhoto from "me.common.js/lib/sizedPhoto";
import Moment from "moment";
import PhotoSource from "../photoSource";
import SearchParams from "../searchParams";

class InstagramSource extends PhotoSource {
    constructor() {
        super("Instagram", new Instagram(process.env.INSTAGRAM_ACCESS_TOKEN));
    }

    get isEnabled() {
        return !!process.env[`${this.type.toUpperCase()}_ACCESS_TOKEN`];
    }

    getUserPhotos(params) {
        params = params instanceof SearchParams ? params : new SearchParams(params);
        const that = this;
        const client = this.client;
        const userId = process.env.INSTAGRAM_USER_ID;
        let instagramRequest = Promise.resolve(userId);

        if (!userId) {
            instagramRequest = client.userSearch(process.env.INSTAGRAM_USER_NAME)
                .then((userJson) => {
                    return _.find(userJson.data, {username: process.env.INSTAGRAM_USER_NAME}).id;
                });
        }

        return instagramRequest
            .then((userId) => {
                return client.userMedia(userId, params.Instagram);
            })
            .then(mediaJson => {
                return _.filter(mediaJson.data, {type: "image"})
                    .map(_.bind(that.jsonToPhoto, that));
            });
    }

    getPhoto(photoId) {
        const that = this;

        return this.client.media(photoId)
            .then((photoJson) => {
                return that.jsonToPhoto(photoJson.data);
            });
    }

    jsonToPhoto(photoJson) {
        const sizedPhotos = Object.keys(photoJson.images).map((key) => {
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
