import {castDatePropertyToDateTime} from "@randy.tarampi/js";
import {List, Record} from "immutable";

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
    constructor({startDate, endDate, ...properties} = {}) {
        super({
            startDate: castDatePropertyToDateTime(startDate),
            endDate: castDatePropertyToDateTime(endDate),
            ...properties
        });
    }

    static fromJS(js = {}) {
        return new Project({
            ...js,
            highlights: js.highlights ? List(js.highlights) : null,
            keywords: js.highlights ? List(js.keywords) : null,
            roles: js.roles ? List(js.roles) : null
        });
    }

    static fromJSON(json = {}) {
        return new Project({
            ...json,
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
