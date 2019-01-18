import {BlogPosting as SchemaBlogPosting, ImageObject as SchemaImageObject} from "@randy.tarampi/schema-dot-org-types";
import {List} from "immutable";
import Photo from "./photo";
import Post, {PostClassGenerator} from "./post";
import {sortPhotosByWidth} from "./util";

export class Gallery extends PostClassGenerator({
    photos: List()
}) {
    static get type() {
        return "Gallery";
    }

    get sortedSizedPhotos() {
        return this.photos.sort(sortPhotosByWidth);
    }

    get smallestPhoto() {
        return this.sortedSizedPhotos.last();
    }

    get smallestImage() {
        return this.smallestPhoto.smallestImage;
    }

    get largestPhoto() {
        return this.sortedSizedPhotos.first();
    }

    get largestImage() {
        return this.largestPhoto.largestImage;
    }

    getSizedPhotoForDisplay(width) {
        const widthAppropriatePhotos = this.smallestPhoto.sortedSizedPhotos.filter(sizedPhoto => sizedPhoto.width >= width && sizedPhoto.size !== "raw");

        return widthAppropriatePhotos.first() || this.smallestPhoto.sortedSizedPhotos.last();
    }


    getSizedPhotoForLoading() {
        return this.smallestImage;
    }

    static parsePropertiesFromJs(js) {
        return {
            ...Post.parsePropertiesFromJs(js),
            photos: js.photos ? List(js.photos.map(photo => Photo.fromJS(photo))) : List()
        };
    }

    static parsePropertiesFromJson(json) {
        return {
            ...Post.parsePropertiesFromJson(json),
            photos: json.photos ? List(json.photos.map(photo => Photo.fromJSON(photo))) : List()
        };
    }

    toSchema() {
        const firstPhoto = this.photos.first();
        const {photos, ...superSchema} = super.toSchema(); // eslint-disable-line no-unused-vars
        const imagePostSchema = {
            ...superSchema,
            accessMode: "visual",
            image: firstPhoto && firstPhoto.largestImage ? firstPhoto.largestImage.url : null
        };

        delete imagePostSchema.sharedContent;

        return new SchemaBlogPosting({
            ...imagePostSchema,
            sharedContent: firstPhoto && firstPhoto.sortedSizedPhotos.size
                ? new SchemaImageObject({
                    ...imagePostSchema,
                    uploadDate: superSchema.datePublished,
                    height: `${firstPhoto.largestImage.height}px`,
                    width: `${firstPhoto.largestImage.width}px`,
                    caption: superSchema.articleBody,
                    thumbnail: firstPhoto.smallestImage.url,
                    contentUrl: imagePostSchema.image
                })
                : null
        });
    }

    toRss(options = {}) {
        const firstPhoto = this.photos.first();
        return {
            ...super.toRss(options),
            enclosure: firstPhoto
                ? {
                    url: firstPhoto.largestImage.url
                }
                : null
        };
    }
}

export default Gallery;
