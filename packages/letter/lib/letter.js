import {Person} from "@randy.tarampi/js";
import {List, Map, Record} from "immutable";
import LetterSection from "./letterSection";

export class Letter extends Record({
    sender: null,
    recipient: null,
    id: null,
    fileName: null,
    content: List(),
    renderOptions: Map(),
    renderExpectations: Map()
}) {
    get basics() {
        return this.sender;
    }

    get pdfRenderOptions() {
        return this.renderOptions ? this.renderOptions.toJS() : null;
    }

    get pdfRenderExpectations() {
        return this.renderExpectations ? this.renderExpectations.toJS() : null;
    }

    get pageSize() {
        return this.renderOptions ? this.renderOptions.get("format") : null;
    }

    get fileName() {
        if (this.get("fileName")) {
            return this.get("fileName");
        }

        return this.id;
    }

    static fromJS(js = {}) {
        return new Letter({
            ...js,
            sender: js.sender ? Person.fromJS(js.sender) : null,
            recipient: js.recipient ? Person.fromJS(js.recipient) : null,
            content: js.content ? List(js.content.map(LetterSection.fromJS)) : null,
            renderOptions: js.renderOptions ? Map(js.renderOptions) : null,
            renderExpectations: js.renderExpectations ? Map(js.renderExpectations) : null,
        });
    }

    static fromJSON(json = {}) {
        return new Letter({
            ...json,
            sender: json.sender ? Person.fromJSON(json.sender) : null,
            recipient: json.recipient ? Person.fromJSON(json.recipient) : null,
            content: json.content ? List(json.content.map(LetterSection.fromJSON)) : null,
            renderOptions: json.renderOptions ? Map(json.renderOptions) : null,
            renderExpectations: json.renderExpectations ? Map(json.renderExpectations) : null,
        });
    }

    toSchema() {
        return this.sender ? this.sender.toSchema() : null;
    }
}

export default Letter;
