import {List, Record} from "immutable";
import PostalAddress from "./postalAddress";
import Profile from "./profile";

export class Person extends Record({
    additionalName: null,
    givenName: null,
    familyName: null,
    worksFor: null,
    jobTitle: null,
    image: null,
    email: null,
    telephone: null,
    url: null,
    description: null,
    address: null,
    profiles: List([])
}) {
    get firstName() {
        return this.get("givenName");
    }

    get lastName() {
        return this.get("familyName");
    }

    get name() {
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

    get phone() {
        return this.get("telephone");
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

    static fromJS(js) {
        return new Person({
            ...js,
            address: js.address ? PostalAddress.fromJS(js.address) : null,
            profiles: js.profiles ? List(js.profiles.map(Profile.fromJS)) : null
        });
    }

    static fromJSON(json) {
        return new Person({
            ...json,
            address: json.address ? PostalAddress.fromJSON(json.address) : null,
            profiles: json.profiles ? List(json.profiles.map(Profile.fromJSON)) : null
        });
    }

    static fromResume(json) {
        return new Person({
            ...json,
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
}

export default Person;
