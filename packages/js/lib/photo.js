import {List} from "immutable";
import Post, {PostClassGenerator} from "./post";
import SizedPhoto from "./sizedPhoto";
import * as util from "./util";

class Photo extends PostClassGenerator({
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

    getSizedPhoto(width) {
        const widthAppropriatePhotos = this.sortedSizedPhotos.filter(sizedPhoto => sizedPhoto.width >= width);

        return widthAppropriatePhotos.first() || this.sortedSizedPhotos.last();
    }

    getSizedPhotoForLoading() {
        return this.sortedSizedPhotos.first();
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
