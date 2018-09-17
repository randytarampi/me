import {Person as SchemaPerson} from "@randy.tarampi/schema-dot-org-types";
import {Record} from "immutable";

export class Profile extends Record({ // NOTE-RT: This should really just be a `Person` no?
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

    toSchema() {
        const {username, ...js} = this.toJS(); // eslint-disable-line no-unused-vars
        return new SchemaPerson({
            ...js
        });
    }
}

export default Profile;
