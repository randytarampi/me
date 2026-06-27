// @ts-check
import {Organization as SchemaOrganization} from "@randy.tarampi/schema-dot-org-types";
import {List, Record} from "immutable";
import {formatNumber} from "libphonenumber-js";
import PostalAddress from "./postalAddress.js";

/** An organization record with the same convenience helpers as Person. */
export class Organization extends Record({
    additionalName: null,
    name: null,
    logo: null,
    image: null,
    email: null,
    telephone: null,
    faxNumber: null,
    url: null,
    description: null,
    address: null,
    brand: null,
    sameAs: List(),
    knowsLanguage: List(),
    knowsAbout: List()
}) {
    get name() {
        if (this.get("name")) {
            return this.get("name");
        }

        if (this.get("additionalName")) {
            return this.get("additionalName");
        }

        return null;
    }

    get picture() {
        return this.get("image");
    }

    get telephone() {
        return this.get("telephone")
            ? formatNumber(this.get("telephone"), "International")
            : null;
    }

    get faxNumber() {
        return this.get("faxNumber")
            ? formatNumber(this.get("faxNumber"), "International")
            : null;
    }

    get phone() {
        return this.telephone;
    }

    get fax() {
        return this.faxNumber;
    }

    get website() {
        return this.get("url");
    }

    get location() {
        return this.get("address");
    }

    get address() {
        return this.location && this.location.address;
    }

    get city() {
        return this.location && this.location.city;
    }

    get region() {
        return this.location && this.location.region;
    }

    get postalCode() {
        return this.location && this.location.postalCode;
    }

    get countryCode() {
        return this.location && this.location.countryCode;
    }

    /** @param {object} [js={}] - Raw JS data. @returns {Organization} */
    static fromJS(js = {}) {
        return new Organization({
            ...js,
            brand: js.brand ? Organization.fromJS(js.brand) : null,
            knowsLanguage: js.knowsLanguage ? List(js.knowsLanguage) : null,
            knowsAbout: js.knowsAbout ? List(js.knowsAbout) : null,
            sameAs: js.sameAs ? List(js.sameAs) : null,
            address: js.address ? PostalAddress.fromJS(js.address) : null
        });
    }

    /** @param {object} [json={}] - Raw JSON data. @returns {Organization} */
    static fromJSON(json = {}) {
        return new Organization({
            ...json,
            brand: json.brand ? Organization.fromJSON(json.brand) : null,
            knowsLanguage: json.knowsLanguage ? List(json.knowsLanguage) : null,
            knowsAbout: json.knowsAbout ? List(json.knowsAbout) : null,
            sameAs: json.sameAs ? List(json.sameAs) : null,
            address: json.address ? PostalAddress.fromJSON(json.address) : null
        });
    }

    /** @param {object} [json={}] - Resume-style data. @returns {Organization} */
    static fromResume(json = {}) {
        return new Organization({
            ...json,
            additionalName: json.name,
            image: json.picture,
            telephone: json.phone,
            url: json.website,
            description: json.summary,
            address: json.location ? PostalAddress.fromResume(json.location) : null
        });
    }

    /** @returns {object} Resume-friendly data. */
    toResume() {
        return {
            name: this.name,
            picture: this.image,
            phone: this.telephone,
            email: this.email,
            website: this.url,
            summary: this.description,
            location: this.location ? this.location.toResume() : null
        };
    }

    /** @returns {SchemaOrganization} Schema.org output. */
    toSchema() {
        const {knowsLanguage, ...js} = this.toJS();  

        return new SchemaOrganization({
            ...js,
            brand: this.brand ? this.brand.toSchema() : null,
            address: this.location ? this.location.toSchema() : null,
            sameAs: this.sameAs ? this.sameAs.toJS() : null,
            knowsLanguage: Array.isArray(knowsLanguage)
                ? knowsLanguage.map(language =>
                    typeof language === "string"
                        ? Object.assign({"@type": "Language"}, {name: language})
                        : Object.assign({"@type": "Language"}, language)
                )
                : null,
            knowsAbout: this.knowsAbout ? this.knowsAbout.toJS() : null
        });
    }
}

export default Organization;
