import {Record} from "immutable";

export class PostalAddress extends Record({
    streetAddress: null,
    postalCode: null,
    addressLocality: null,
    addressCountry: null,
    addressRegion: null,
    postOfficeBoxNumber: null,
    countryCode: null
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

    get country() {
        return this.get("addressCountry");
    }

    get countryCode() {
        return this.get("countryCode") || this.country;
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
            countryCode: this.countryCode || this.country
        };
    }
}

export default PostalAddress;
