import {List} from "immutable";
import Post, {PostClassGenerator} from "./post";
import SizedPhoto from "./sizedPhoto";

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

    getSizedPhoto(width) {
        const sortedSizedPhotos = this.sizedPhotos.sort(widthSorter);
        const widthAppropriatePhotos = sortedSizedPhotos.filter(sizedPhoto => sizedPhoto.width >= width);

        return widthAppropriatePhotos.first() || sortedSizedPhotos.last();
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

export const widthSorter = (a, b) => {
    if (a.width < b.width) {
        return -1;
    } else if (a.width > b.width) {
        return 1;
    } else {
        return 0;
    }
};
