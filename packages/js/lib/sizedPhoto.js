class SizedPhoto {
    constructor(url, width, height, size) {
        this.url = url;
        this.width = width;
        this.height = height;
        this.size = size || width && width.toString();
    }

    static fromJSON(json) {
        return new SizedPhoto(json.url, json.width, json.height, json.size);
    }
}

export default SizedPhoto;
