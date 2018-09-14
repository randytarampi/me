import {List, Record} from "immutable";
import {DateTime} from "luxon";

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
    static fromJS(js = {}) {
        return new Education({
            ...js,
            startDate: js.startDate ? DateTime.fromJSDate(js.startDate) : null,
            endDate: js.endDate ? DateTime.fromJSDate(js.endDate) : null,
            courses: js.courses ? List(js.courses) : null
        });
    }

    static fromJSON(json = {}) {
        return new Education({
            ...json,
            startDate: json.startDate ? DateTime.fromISO(json.startDate) : null,
            endDate: json.endDate ? DateTime.fromISO(json.endDate) : null,
            courses: json.courses ? List(json.courses) : null
        });
    }

    static fromResume(json = {}) {
        return Education.fromJSON(json);
    }
}

export default Education;
