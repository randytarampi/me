import {castDatePropertyToDateTime} from "@randy.tarampi/js";
import {List, Record} from "immutable";

export class Education extends Record({
    institution: null,
    area: null,
    studyType: null,
    gpa: null,
    startDate: null,
    endDate: null,
    summary: null,
    website: null,
    courses: List()
}) {
    constructor({startDate, endDate, ...properties} = {}) {
        super({
            startDate: castDatePropertyToDateTime(startDate),
            endDate: castDatePropertyToDateTime(endDate),
            ...properties
        });
    }

    static fromJS(js = {}) {
        return new Education({
            ...js,
            courses: js.courses ? List(js.courses) : null
        });
    }

    static fromJSON(json = {}) {
        return new Education({
            ...json,
            courses: json.courses ? List(json.courses) : null
        });
    }

    static fromResume(json = {}) {
        return Education.fromJSON(json);
    }
}

export default Education;
