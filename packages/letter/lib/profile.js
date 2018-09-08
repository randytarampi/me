import {Record} from "immutable";

class Profile extends Record({
    network: null,
    username: null,
    url: null
}) {
    static fromJS(js) {
        return new Profile({
            ...js
        });
    }

    static fromJSON(json) {
        return new Profile({
            ...json
        });
    }
}

export default Profile;
