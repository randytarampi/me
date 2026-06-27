// @ts-check
import {Record} from "immutable";

/** A single image size in a post's photo set. */
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

    /** @param {object} js - Raw size data. @returns {SizedPhoto} */
    static fromJS(js) {
        return new SizedPhoto(js);
    }

    /** @param {object} [json={}] - Raw JSON size data. @returns {SizedPhoto} */
    static fromJSON({width, height, ...json} = {}) {
        return SizedPhoto.fromJS({
            ...json,
            width: width && Number(width),
            height: height && Number(height)
        });
    }
}

export default SizedPhoto;
