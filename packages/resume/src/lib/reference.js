import {Record} from "immutable";

export class Reference extends Record({
    name: null,
    reference: null
}) {
    static fromJS(js) {
        return new Reference(js);
    }

    static fromJSON(json) {
        return new Reference(json);
    }

    static fromResume(json) {
        return Reference.fromJSON(json);
    }
}

export default Reference;
