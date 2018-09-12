import {Record} from "immutable";

export class SizedPhoto extends Record({
    url: null,
    width: null,
    height: null,
    size: null,
}) {
    get size() {
        if (this.get("size")) {
            return this.get("size");
        }

        return this.width && this.width.toString();
    }

    static fromJS(js) {
        return new SizedPhoto(js);
    }

    static fromJSON({width, height, ...json} = {}) {
        return SizedPhoto.fromJS({
            ...json,
            width: width && Number(width),
            height: height && Number(height)
        });
    }
}

export default SizedPhoto;
