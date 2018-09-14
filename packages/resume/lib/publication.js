import {Record} from "immutable";
import {DateTime} from "luxon";

export class Publication extends Record({
    name: null,
    publisher: null,
    releaseDate: null,
    summary: null,
    url: null
}) {
    static fromJS(js = {}) {
        return new Publication({
            ...js,
            releaseDate: js.releaseDate ? DateTime.fromJSDate(js.releaseDate) : null
        });
    }

    static fromJSON(json = {}) {
        return new Publication({
            ...json,
            releaseDate: json.releaseDate ? DateTime.fromISO(json.releaseDate) : null
        });
    }

    static fromResume(json = {}) {
        return Publication.fromJSON(json);
    }
}

export default Publication;
