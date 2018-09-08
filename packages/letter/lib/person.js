import {List, Record} from "immutable";
import Location from "./location";
import Profile from "./profile";

class Person extends Record({
    name: null,
    firstName: null,
    lastName: null,
    worksFor: null,
    jobTitle: null,
    label: null,
    picture: null,
    email: null,
    phone: null,
    website: null,
    summary: null,
    location: null
}) {
    get name() {
        if (this.get("name")) {
            return this.get("name");
        }

        if (this.firstName && this.lastName) {
            return `${this.firstName} ${this.lastName}`;
        }

        return null;
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
            location: js.location ? Location.fromJS(js.location) : null,
            profiles: js.profiles ? List(js.profiles.map(Profile.fromJS)) : null
        });
    }

    static fromJSON(json) {
        return new Person({
            ...json,
            location: json.location ? Location.fromJSON(json.location) : null,
            profiles: json.profiles ? List(json.profiles.map(Profile.fromJSON)) : null
        });
    }
}

export default Person;
