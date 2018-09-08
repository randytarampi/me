import {Map, Record} from "immutable";

class LetterSection extends Record({
    contentKey: null,
    sectionId: null,
    contentProps: Map(),
    component: null
}) {
    get contentProps() {
        return this.get("contentProps").toJS();
    }

    static fromJS(js) {
        return new LetterSection({
            ...js,
            contentProps: js.contentProps ? Map(js.contentProps) : Map()
        });
    }

    static fromJSON(json) {
        return new LetterSection({
            ...json,
            contentProps: json.contentProps ? Map(json.contentProps) : Map()
        });
    }
}

export default LetterSection;
