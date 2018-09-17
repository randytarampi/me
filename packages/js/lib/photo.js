import {BlogPosting as SchemaBlogPosting, ImageObject as SchemaImageObject} from "@randy.tarampi/schema-dot-org-types";
import {List} from "immutable";
import Post, {PostClassGenerator} from "./post";
import SizedPhoto from "./sizedPhoto";
import * as util from "./util";

export class Photo extends PostClassGenerator({
    width: null,
    height: null,
    sizedPhotos: List()
}) {
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
        return this.sizedPhotos.sort(util.sortPhotosByWidth);
    }

    getSizedPhotoForDisplay(width) {
        const widthAppropriatePhotos = this.sortedSizedPhotos.filter(sizedPhoto => sizedPhoto.width >= width && sizedPhoto.size !== "raw");

        return widthAppropriatePhotos.first() || this.sortedSizedPhotos.last();
    }

    get smallestImage() {
        return this.sortedSizedPhotos.first();
    }

    get largestImage() {
        return this.sortedSizedPhotos.last();
    }

    getSizedPhotoForLoading() {
        return this.smallestImage;
    }

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
}

export default Photo;

const scaleHeightToWidth = (limitedWidth, originalWidth, originalHeight) => {
    return ~~((originalHeight / originalWidth) * limitedWidth);
};

const ensureSizedPhotoHasHeight = (sizedPhotoJs, fullWidth, fullHeight) => {
    if (sizedPhotoJs.height) {
        return sizedPhotoJs;
    }

    return {
        ...sizedPhotoJs,
        height: scaleHeightToWidth(sizedPhotoJs.width, fullWidth, fullHeight)
    };
};
