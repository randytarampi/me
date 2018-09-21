import {List, Record} from "immutable";
import {DateTime} from "luxon";

export class Volunteer extends Record({
    organization: null,
    position: null,
    startDate: null,
    endDate: null,
    summary: null,
    website: null,
    highlights: List()
}) {
    static fromJS(js = {}) {
        return new Volunteer({
            ...js,
            startDate: js.startDate ? DateTime.fromJSDate(js.startDate) : null,
            endDate: js.endDate ? DateTime.fromJSDate(js.endDate) : null,
            highlights: js.highlights ? List(js.highlights) : null
        });
    }

    static fromJSON(json = {}) {
        return new Volunteer({
            ...json,
            startDate: json.startDate ? DateTime.fromISO(json.startDate) : null,
            endDate: json.endDate ? DateTime.fromISO(json.endDate) : null,
            highlights: json.highlights ? List(json.highlights) : null
        });
    }

    static fromResume(json = {}) {
        return Volunteer.fromJSON(json);
    }
}

export default Volunteer;
