import {PrintableSection} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumeReferences from "../../../../../../../src/lib/components/resume/content/references";
import testResumeJson from "../../../../../../../src/resumes/test";

describe("ResumeReferences", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<ResumeReferences resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".resume-references__reference");
        expect(rendered).to.have.descendants(".resume-references__reference-quote");
        expect(rendered).to.have.descendants(".resume-references__reference-referee");

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "references");
        expect(printableSection).to.have.prop("label", "References");
    });
});
