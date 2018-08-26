import {Record} from "immutable";

class SizedPhoto extends Record({
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

    static fromJSON(json) {
        return SizedPhoto.fromJS(json);
    }
}

export default SizedPhoto;
