import {PrintableSection} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumeEducation from "../../../../../../../../src/lib/components/resume/content/education";
import ResumeEducationEntry from "../../../../../../../../src/lib/components/resume/content/education/entry";
import testResumeJson from "../../../../../../../../src/resumes/some-awesome-company";

describe("ResumeEducation", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<ResumeEducation resume={stubResume}/>);

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "education");
        expect(printableSection).to.have.prop("label", "Education");

        const educationEntries = rendered.find(ResumeEducationEntry);
        expect(educationEntries).to.have.length(stubResume.education.length);
    });
});
