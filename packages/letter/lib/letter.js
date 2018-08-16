import {List, Map, Record} from "immutable";
import letterJson from "../letter.json";
import LetterSection from "./letterSection";
import Person from "./person";

class Letter extends Record({
    sender: null,
    recipient: null,
    id: null,
    fileName: null,
    content: List(),
    renderOptions: Map(),
}) {
    get basics() {
        return this.sender;
    }

    get pdfRenderOptions() {
        return this.renderOptions.toJS();
    }

    get pageSize() {
        return this.renderOptions && this.renderOptions.get("format");
    }

    get fileName() {
        if (this.get("fileName")) {
            return this.get("fileName");
        }

        return this.id;
    }

    static fromJS(passedJson) {
        const json = Object.assign({}, letterJson, passedJson);
        return new Letter({
            ...json,
            sender: json.sender ? Person.fromJS(json.sender) : null,
            recipient: json.recipient ? Person.fromJS(json.recipient) : null,
            content: json.content ? List(json.content.map(LetterSection.fromJS)) : null,
            renderOptions: Map(json.renderOptions),
        });
    }
}

export default Letter;
