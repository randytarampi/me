import {List, Record} from "immutable";
import {DateTime} from "luxon";

export class Project extends Record({
    name: null,
    description: null,
    startDate: null,
    endDate: null,
    type: null,
    url: null,
    highlights: List(),
    keywords: List(),
    roles: List()
}) {
    static fromJS(js = {}) {
        return new Project({
            ...js,
            startDate: js.startDate ? DateTime.fromJSDate(js.startDate) : null,
            endDate: js.endDate ? DateTime.fromJSDate(js.endDate) : null,
            highlights: js.highlights ? List(js.highlights) : null,
            keywords: js.highlights ? List(js.keywords) : null,
            roles: js.roles ? List(js.roles) : null
        });
    }

    static fromJSON(json = {}) {
        return new Project({
            ...json,
            startDate: json.startDate ? DateTime.fromISO(json.startDate) : null,
            endDate: json.endDate ? DateTime.fromISO(json.endDate) : null,
            highlights: json.highlights ? List(json.highlights) : null,
            keywords: json.keywords ? List(json.keywords) : null,
            roles: json.roles ? List(json.roles) : null
        });
    }

    static fromResume(json = {}) {
        return Project.fromJSON(json);
    }
}

export default Project;
