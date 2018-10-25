import {Person as SchemaPerson} from "@randy.tarampi/schema-dot-org-types";
import {List, Record} from "immutable";
import {formatNumber} from "libphonenumber-js";
import Organization from "./organization";
import Place from "./place";
import PostalAddress from "./postalAddress";
import Profile from "./profile";
import {castDatePropertyToDateTime} from "./util";

export class Person extends Record({
    honorificPrefix: null,
    additionalName: null,
    name: null,
    givenName: null,
    familyName: null,
    honorificSuffix: null,
    jobTitle: null,
    gender: null,
    nationality: null,
    height: null,
    weight: null,
    birthDate: null,
    image: null,
    email: null,
    telephone: null,
    faxNumber: null,
    url: null,
    description: null,
    address: null,
    birthPlace: null,
    brand: null,
    worksFor: null,
    alumniOf: null,
    sameAs: List(),
    profiles: List(),
    knowsLanguage: List(),
    knowsAbout: List()
}) {
    constructor({birthDate, ...properties} = {}) {
        super({
            birthDate: castDatePropertyToDateTime(birthDate),
            ...properties
        });
    }

    get firstName() {
        return this.get("givenName");
    }

    get lastName() {
        return this.get("familyName");
    }

    get name() {
        if (this.get("name")) {
            return this.get("name");
        }

        if (this.get("additionalName")) {
            return this.get("additionalName");
        }

        if (this.firstName && this.lastName) {
            return `${this.firstName} ${this.lastName}`;
        }

        return null;
    }

    get label() {
        return this.get("jobTitle");
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

    get summary() {
        return this.get("description");
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
        return new Person({
            ...js,
            birthPlace: js.birthPlace ? Place.fromJS(js.birthPlace) : null,
            brand: js.brand ? Organization.fromJS(js.brand) : null,
            worksFor: js.worksFor ? Organization.fromJS(js.worksFor) : null,
            alumniOf: js.alumniOf ? Organization.fromJS(js.alumniOf) : null,
            knowsLanguage: js.knowsLanguage ? List(js.knowsLanguage) : null,
            knowsAbout: js.knowsAbout ? List(js.knowsAbout) : null,
            sameAs: js.sameAs ? List(js.sameAs) : null,
            address: js.address ? PostalAddress.fromJS(js.address) : null,
            profiles: js.profiles ? List(js.profiles.map(Profile.fromJS)) : null
        });
    }

    static fromJSON(json = {}) {
        return new Person({
            ...json,
            birthPlace: json.birthPlace ? Place.fromJSON(json.birthPlace) : null,
            brand: json.brand ? Organization.fromJSON(json.brand) : null,
            worksFor: json.worksFor ? Organization.fromJSON(json.worksFor) : null,
            alumniOf: json.alumniOf ? Organization.fromJSON(json.alumniOf) : null,
            knowsLanguage: json.knowsLanguage ? List(json.knowsLanguage) : null,
            knowsAbout: json.knowsAbout ? List(json.knowsAbout) : null,
            sameAs: json.sameAs ? List(json.sameAs) : null,
            address: json.address ? PostalAddress.fromJSON(json.address) : null,
            profiles: json.profiles ? List(json.profiles.map(Profile.fromJSON)) : null
        });
    }

    static fromResume(json = {}) {
        return new Person({
            ...json,
            name: json.name,
            additionalName: json.name,
            givenName: json.firstName,
            familyName: json.lastName,
            jobTitle: json.jobTitle || json.label,
            image: json.picture,
            telephone: json.phone,
            url: json.website,
            description: json.summary,
            address: json.location ? PostalAddress.fromResume(json.location) : null,
            profiles: json.profiles ? List(json.profiles.map(Profile.fromResume)) : null
        });
    }

    toResume() {
        return {
            name: this.name,
            firstName: this.firstName,
            lastName: this.lastName,
            label: this.jobTitle,
            picture: this.image,
            phone: this.telephone,
            email: this.email,
            website: this.url,
            summary: this.description,
            location: this.location ? this.location.toResume() : null,
            profiles: this.profiles ? this.profiles.toArray().map(profile => profile.toResume()) : null
        };
    }

    toSchema() {
        const {profiles, knowsLanguage, ...js} = this.toJS(); // eslint-disable-line no-unused-vars

        return new SchemaPerson({
            ...js,
            birthDate: this.birthDate ? this.birthDate.toISODate() : null,
            birthPlace: this.birthPlace ? this.birthPlace.toSchema() : null,
            brand: this.brand ? this.brand.toSchema() : null,
            worksFor: this.worksFor ? this.worksFor.toSchema() : null,
            alumniOf: this.alumniOf ? this.alumniOf.toSchema() : null,
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

export default Person;
