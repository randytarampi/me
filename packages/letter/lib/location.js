import {Record} from "immutable";

class Location extends Record({
    address: null,
    postalCode: null,
    city: null,
    countryCode: null,
    region: null
}) {
    static fromJS(json) {
        return new Location({
            ...json
        });
    }
}

export default Location;
