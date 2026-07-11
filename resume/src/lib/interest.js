import {List, Record} from "immutable";

export class Interest extends Record({
    name: null,
    level: null,
    keywords: List()
}) {
    static fromJS(js = {}) {
        return new Interest({
            ...js,
            keywords: js.keywords ? List(js.keywords) : null
        });
    }

    static fromJSON(json = {}) {
        return new Interest({
            ...json,
            keywords: json.keywords ? List(json.keywords) : null
        });
    }

    static fromResume(json = {}) {
        return Interest.fromJSON(json);
    }
}

export default Interest;
