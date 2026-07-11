import {Map, Record} from "immutable";

export class LetterSection extends Record({
    contentKey: null,
    sectionId: null,
    contentProps: Map(),
    sectionProps: Map(),
    component: null
}) {
    get sectionProps() {
        return this.get("sectionProps").toJS();
    }

    get contentProps() {
        return this.get("contentProps").toJS();
    }

    static fromJS(js = {}) {
        return new LetterSection({
            ...js,
            sectionProps: js.sectionProps ? Map(js.sectionProps) : Map(),
            contentProps: js.contentProps ? Map(js.contentProps) : Map()
        });
    }

    static fromJSON(json = {}) {
        return new LetterSection({
            ...json,
            sectionProps: json.sectionProps ? Map(json.sectionProps) : Map(),
            contentProps: json.contentProps ? Map(json.contentProps) : Map()
        });
    }
}

export default LetterSection;
