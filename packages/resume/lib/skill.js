import {List, Record} from "immutable";

export class Skill extends Record({
    name: null,
    level: null,
    keywords: List()
}) {
    static fromJS(js = {}) {
        return new Skill({
            ...js,
            keywords: js.keywords ? List(js.keywords) : null
        });
    }

    static fromJSON(json = {}) {
        return new Skill({
            ...json,
            keywords: json.keywords ? List(json.keywords) : null
        });
    }

    static fromResume(json = {}) {
        return Skill.fromJSON(json);
    }
}

export default Skill;
