import {Record} from "immutable";

export class PostalAddress extends Record({
    streetAddress: null,
    postalCode: null,
    addressLocality: null,
    addressCountry: null,
    addressRegion: null
}) {
    get address() {
        return this.get("streetAddress");
    }

    get region() {
        return this.get("addressRegion");
    }

    get city() {
        return this.get("addressLocality");
    }

    get countryCode() {
        return this.get("addressCountry");
    }

    static fromJS(js) {
        return new PostalAddress({
            ...js
        });
    }

    static fromJSON(json) {
        return new PostalAddress({
            ...json
        });
    }

    static fromResume(json) {
        return PostalAddress.fromJSON({
            ...json,
            streetAddress: json.address,
            addressRegion: json.region,
            addressLocality: json.city,
            addressCountry: json.countryCode
        });
    }

    toResume() {
        return {
            address: this.address,
            postalCode: this.postalCode,
            region: this.region,
            city: this.city,
            countryCode: this.countryCode
        };
    }
}

export default PostalAddress;
