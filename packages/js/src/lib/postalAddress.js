// @ts-check
import {PostalAddress as SchemaPostalAddress} from "@randy.tarampi/schema-dot-org-types";
import {Record} from "immutable";

/** Postal address bits, plus some sugar for resume/schema output. */
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

    /** @param {object} js - Raw address data. @returns {PostalAddress} */
    static fromJS(js) {
        return new PostalAddress({
            ...js
        });
    }

    /** @param {object} json - Raw JSON address data. @returns {PostalAddress} */
    static fromJSON(json) {
        return new PostalAddress({
            ...json
        });
    }

    /** @param {object} json - Resume address data. @returns {PostalAddress} */
    static fromResume(json) {
        return PostalAddress.fromJSON({
            streetAddress: json.address,
            addressRegion: json.region,
            addressLocality: json.city,
            addressCountry: json.countryCode,
            postalCode: json.postalCode
        });
    }

    /** @returns {object} Resume-friendly address data. */
    toResume() {
        return {
            address: this.address,
            postalCode: this.postalCode,
            region: this.region,
            city: this.city,
            countryCode: this.countryCode || this.country
        };
    }

    /** @returns {SchemaPostalAddress} Schema.org output. */
    toSchema() {
        const {countryCode, ...js} = this.toJS(); // eslint-disable-line no-unused-vars
        return new SchemaPostalAddress({
            ...js
        });
    }
}

export default PostalAddress;
