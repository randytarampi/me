import {Place as SchemaPlace} from "@randy.tarampi/schema-dot-org-types";
import DmsCoordinates from "dms-conversion";
import {List, Map, Record} from "immutable";
import geohash from "latlon-geohash";
import {formatNumber} from "libphonenumber-js";
import PostalAddress from "./postalAddress";
import {convertLatLongToGeohash} from "./util";

export class Place extends Record({
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
    sameAs: List(),
    knowsLanguage: List(),
    knowsAbout: List(),
    geo: null
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

    get latitude() {
        if (this.geo) {
            if (Number.isFinite(this.geo.get("latitude"))) {
                return this.geo.get("latitude");
            }

            if (this.geo.get("geohash")) {
                return geohash.decode(this.geo.get("geohash")).lat;
            }
        }

        return null;
    }

    get longitude() {
        if (this.geo) {
            if (Number.isFinite(this.geo.get("longitude"))) {
                return this.geo.get("longitude");
            }

            if (this.geo.get("geohash")) {
                return geohash.decode(this.geo.get("geohash")).lon;
            }
        }

        return null;
    }

    get lat() {
        return this.latitude;
    }

    get long() {
        return this.longitude;
    }

    get geohash() {
        if (this.geo) {
            if (this.geo.get("geohash")) {
                return this.geo.get("geohash");
            }

            if (Number.isFinite(this.geo.get("latitude")) && Number.isFinite(this.geo.get("longitude"))) {
                return convertLatLongToGeohash(this.geo.get("latitude"), this.geo.get("longitude"));
            }
        }

        return null;
    }

    get coordinates() {
        if (Number.isFinite(this.lat) && Number.isFinite(this.long)) {
            return new DmsCoordinates(this.lat, this.long);
        }

        return null;
    }

    static fromJS(js = {}) {
        return new Place({
            ...js,
            geo: js.geo ? Map(js.geo) : null,
            knowsLanguage: js.knowsLanguage ? List(js.knowsLanguage) : null,
            knowsAbout: js.knowsAbout ? List(js.knowsAbout) : null,
            sameAs: js.sameAs ? List(js.sameAs) : null,
            address: js.address ? PostalAddress.fromJS(js.address) : null
        });
    }

    static fromJSON(json = {}) {
        return new Place({
            ...json,
            geo: json.geo ? Map(json.geo) : null,
            knowsLanguage: json.knowsLanguage ? List(json.knowsLanguage) : null,
            knowsAbout: json.knowsAbout ? List(json.knowsAbout) : null,
            sameAs: json.sameAs ? List(json.sameAs) : null,
            address: json.address ? PostalAddress.fromJSON(json.address) : null
        });
    }

    static fromResume(json = {}) {
        return new Place({
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
        return new SchemaPlace({
            ...this.toJS(),
            geo: this.geo ? this.geo.toJS() : null,
            address: this.location ? this.location.toSchema() : null,
            sameAs: this.sameAs ? this.sameAs.toJS() : null,
            knowsLanguage: this.knowsLanguage ? this.knowsLanguage.toJS() : null,
            knowsAbout: this.knowsAbout ? this.knowsAbout.toJS() : null
        });
    }
}

export default Place;
