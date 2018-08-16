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

    static fromJS(json) {
        return new LetterSection({
            ...json,
            contentProps: Map(json.contentProps)
        });
    }
}

export default LetterSection;
