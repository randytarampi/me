// @ts-check
import {Person as SchemaPerson} from "@randy.tarampi/schema-dot-org-types";
import {Record} from "immutable";

/** A social profile record. */
export class Profile extends Record({ // NOTE-RT: This should really just be a `Person` no?
    id: null,
    username: null,
    name: null,
    url: null,
    image: null,
    network: null
}) {
    /** @param {object} js - Raw profile data. @returns {Profile} */
    static fromJS(js) {
        return new Profile(js);
    }

    /** @param {object} json - Raw JSON profile data. @returns {Profile} */
    static fromJSON(json) {
        return Profile.fromJS(json);
    }

    /** @param {object} resumeJson - Resume data. @returns {Profile} */
    static fromResume(resumeJson) {
        return Profile.fromJSON(resumeJson);
    }

    /** @returns {object} Resume-friendly profile data. */
    toResume() {
        return {
            network: this.network,
            username: this.username,
            url: this.url
        };
    }

    /** @returns {SchemaPerson} Schema.org output. */
    toSchema() {
        const {username, ...js} = this.toJS(); // eslint-disable-line no-unused-vars
        return new SchemaPerson({
            ...js
        });
    }
}

export default Profile;
