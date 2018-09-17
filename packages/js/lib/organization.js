import {Organization as SchemaOrganization} from "@randy.tarampi/schema-dot-org-types";
import {List, Record} from "immutable";
import {formatNumber} from "libphonenumber-js";
import PostalAddress from "./postalAddress";

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

    toSchema() {
        const {knowsLanguage, ...js} = this.toJS(); // eslint-disable-line no-unused-vars

        return new SchemaOrganization({
            ...js,
            brand: this.brand ? this.brand.toSchema() : null,
            address: this.location ? this.location.toSchema() : null,
            sameAs: this.sameAs ? this.sameAs.toJS() : null,
            knowsLanguage: knowsLanguage
                ? Array.isArray(knowsLanguage)
                    ? knowsLanguage.map(language =>
                        typeof language === "string"
                            ? language
                            : Object.assign({
                                "@type": "Language"
                            })
                    )
                    : knowsLanguage
                : null,
            knowsAbout: this.knowsAbout ? this.knowsAbout.toJS() : null
        });
    }
}

export default Organization;
