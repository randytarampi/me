import {Record} from "immutable";
import {DateTime} from "luxon";

export class Award extends Record({
    title: null,
    awarder: null,
    date: null,
    summary: null
}) {
    static fromJS(js = {}) {
        return new Award({
            ...js,
            date: js.date ? DateTime.fromJSDate(js.date) : null
        });
    }

    static fromJSON(json = {}) {
        return new Award({
            ...json,
            date: json.date ? DateTime.fromISO(json.date) : null
        });
    }

    static fromResume(json = {}) {
        return Award.fromJSON(json);
    }
}

export default Award;
