import {PrintableSection} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumeLanguages from "../../../../../../../src/lib/components/resume/content/languages";
import testResumeJson from "../../../../../../../src/resumes/some-awesome-company";

describe("ResumeLanguages", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<ResumeLanguages resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".resume-languages__language-entry");
        expect(rendered).to.have.descendants(".resume-languages__language");
        expect(rendered).to.have.descendants(".resume-languages__fluency");

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "languages");
        expect(printableSection).to.have.prop("label", "Languages");
    });
});
