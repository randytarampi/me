// @ts-check
import {BlogPosting as SchemaBlogPosting, ImageObject as SchemaImageObject} from "@randy.tarampi/schema-dot-org-types";
import {List} from "immutable";
import Post, {PostClassGenerator} from "./post.js";
import SizedPhoto from "./sizedPhoto.js";
import {sortPhotosByWidth} from "./util/index.js";

/** A post that carries a few sizes of the same image. */
export class Photo extends PostClassGenerator({
    width: null,
    height: null,
    sizedPhotos: List()
}) {
    static get type() {
        return "Photo";
    }

    static parsePropertiesFromJs(js) {
        return {
            ...Post.parsePropertiesFromJs(js),
            sizedPhotos: js.sizedPhotos ? List(js.sizedPhotos.map(sizedPhoto => SizedPhoto.fromJS(ensureSizedPhotoHasHeight(sizedPhoto, js.width, js.height)))) : List()
        };
    }

    static parsePropertiesFromJson(json) {
        return {
            ...Post.parsePropertiesFromJson(json),
            sizedPhotos: json.sizedPhotos ? List(json.sizedPhotos.map(sizedPhoto => SizedPhoto.fromJSON(ensureSizedPhotoHasHeight(sizedPhoto, json.width, json.height)))) : List()
        };
    }

    get sortedSizedPhotos() {
        return this.sizedPhotos.sort(sortPhotosByWidth);
    }

    /** @param {number} width - The space we need to fill. @returns {*} The best-fit image. */
    getSizedPhotoForDisplay(width) {
        const widthAppropriatePhotos = this.sortedSizedPhotos.filter(sizedPhoto => sizedPhoto.width >= width && sizedPhoto.size !== "raw");

        return widthAppropriatePhotos.first() || this.sortedSizedPhotos.last();
    }

    /** @returns {*} The smallest image. */
    get smallestImage() {
        return this.sortedSizedPhotos.first();
    }

    /** @returns {*} The largest image. */
    get largestImage() {
        return this.sortedSizedPhotos.last();
    }

    /** @returns {*} The smallest image for quick loading. */
    getSizedPhotoForLoading() {
        return this.smallestImage;
    }

    /** @returns {SchemaBlogPosting} Schema.org output, because search engines are nosy. */
    toSchema() {
        const {sizedPhotos, ...superSchema} = super.toSchema(); // eslint-disable-line no-unused-vars
        const imagePostSchema = {
            ...superSchema,
            accessMode: "visual",
            image: this.largestImage ? this.largestImage.url : null
        };

        delete imagePostSchema.sharedContent;

        return new SchemaBlogPosting({
            ...imagePostSchema,
            sharedContent: this.sortedSizedPhotos.size
                ? new SchemaImageObject({
                    ...imagePostSchema,
                    uploadDate: superSchema.datePublished,
                    height: `${this.largestImage.height}px`,
                    width: `${this.largestImage.width}px`,
                    caption: superSchema.articleBody,
                    thumbnail: this.smallestImage.url,
                    contentUrl: imagePostSchema.image
                })
                : null
        });
    }

    /** @param {object} [options={}] - RSS bits. @returns {object} RSS-friendly image extras. */
    toRss(options = {}) {
        return {
            ...super.toRss(options),
            enclosure: this.largestImage
                ? {
                    url: this.largestImage.url
                }
                : null
        };
    }
}

export default Photo;

/** @param {number} limitedWidth @param {number} originalWidth @param {number} originalHeight @returns {number} */
const scaleHeightToWidth = (limitedWidth, originalWidth, originalHeight) => {
    return ~~((originalHeight / originalWidth) * limitedWidth);
};

/** @param {object} sizedPhotoJs @param {number} fullWidth @param {number} fullHeight @returns {object} */
const ensureSizedPhotoHasHeight = (sizedPhotoJs, fullWidth, fullHeight) => {
    if (sizedPhotoJs.height) {
        return sizedPhotoJs;
    }

    return {
        ...sizedPhotoJs,
        height: scaleHeightToWidth(sizedPhotoJs.width, fullWidth, fullHeight)
    };
};
