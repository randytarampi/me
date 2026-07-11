import {Record} from "immutable";

export class Language extends Record({
    fluency: null,
    language: null
}) {
    static fromJS(js) {
        return new Language(js);
    }

    static fromJSON(json) {
        return new Language(json);
    }

    static fromResume(json) {
        return Language.fromJSON(json);
    }
}

export default Language;
