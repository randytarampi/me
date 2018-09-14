import {Record} from "immutable";

export class Profile extends Record({
    id: null,
    username: null,
    name: null,
    url: null,
    image: null,
    network: null
}) {
    static fromJS(js) {
        return new Profile(js);
    }

    static fromJSON(json) {
        return Profile.fromJS(json);
    }

    static fromResume(resumeJson) {
        return Profile.fromJSON(resumeJson);
    }

    toResume() {
        return {
            network: this.network,
            username: this.username,
            url: this.url
        };
    }
}

export default Profile;
