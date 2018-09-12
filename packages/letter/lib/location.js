import {Record} from "immutable";

export class Location extends Record({
    address: null,
    postalCode: null,
    city: null,
    countryCode: null,
    region: null
}) {
    static fromJS(js) {
        return new Location({
            ...js
        });
    }

    static fromJSON(json) {
        return new Location({
            ...json
        });
    }
}

export default Location;
