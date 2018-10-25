import {castDatePropertyToDateTime} from "@randy.tarampi/js";
import {List, Record} from "immutable";

export class Work extends Record({
    company: null,
    position: null,
    startDate: null,
    endDate: null,
    summary: null,
    website: null,
    highlights: List()
}) {
    constructor({startDate, endDate, ...properties} = {}) {
        super({
            startDate: castDatePropertyToDateTime(startDate),
            endDate: castDatePropertyToDateTime(endDate),
            ...properties
        });
    }

    static fromJS(js = {}) {
        return new Work({
            ...js,
            highlights: js.highlights ? List(js.highlights) : null
        });
    }

    static fromJSON(json = {}) {
        return new Work({
            ...json,
            highlights: json.highlights ? List(json.highlights) : null
        });
    }

    static fromResume(json = {}) {
        return Work.fromJSON(json);
    }
}

export default Work;
