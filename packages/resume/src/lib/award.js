import {castDatePropertyToDateTime} from "@randy.tarampi/js";
import {Record} from "immutable";

export class Award extends Record({
    title: null,
    awarder: null,
    date: null,
    summary: null
}) {
    constructor({date, ...properties} = {}) {
        super({
            date: castDatePropertyToDateTime(date),
            ...properties
        });
    }

    static fromJS(js) {
        return new Award(js);
    }

    static fromJSON(json) {
        return new Award(json);
    }

    static fromResume(json) {
        return Award.fromJSON(json);
    }
}

export default Award;
