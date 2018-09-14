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

    static fromJS(js) {
        return new Letter({
            ...js,
            sender: js.sender ? Person.fromResume(js.sender) : null, // FIXME-RT: This should be `Person.fromJS`
            recipient: js.recipient ? Person.fromResume(js.recipient) : null, // FIXME-RT: This should be `Person.fromJS`
            content: js.content ? List(js.content.map(LetterSection.fromJS)) : null,
            renderOptions: Map(js.renderOptions),
        });
    }

    static fromJSON(json) {
        return new Letter({
            ...json,
            sender: json.sender ? Person.fromResume(json.sender) : null, // FIXME-RT: This should be `Person.fromJSON`
            recipient: json.recipient ? Person.fromResume(json.recipient) : null, // FIXME-RT: This should be `Person.fromJSON`
            content: json.content ? List(json.content.map(LetterSection.fromJSON)) : null,
            renderOptions: Map(json.renderOptions),
        });
    }

    static fromResume(json) {
        return new Letter({
            ...json,
            sender: json.sender ? Person.fromResume(json.sender) : null,
            recipient: json.recipient ? Person.fromResume(json.recipient) : null,
            content: json.content ? List(json.content.map(LetterSection.fromJSON)) : null,
            renderOptions: Map(json.renderOptions)
        });
    }
}

export default Letter;
