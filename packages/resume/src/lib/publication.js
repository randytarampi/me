import {castDatePropertyToDateTime} from "@randy.tarampi/js";
import {Record} from "immutable";

export class Publication extends Record({
    name: null,
    publisher: null,
    releaseDate: null,
    summary: null,
    url: null
}) {
    constructor({releaseDate, ...properties} = {}) {
        super({
            releaseDate: castDatePropertyToDateTime(releaseDate),
            ...properties
        });
    }

    static fromJS(js) {
        return new Publication(js);
    }

    static fromJSON(json) {
        return new Publication(json);
    }

    static fromResume(json = {}) {
        return Publication.fromJSON(json);
    }
}

export default Publication;
