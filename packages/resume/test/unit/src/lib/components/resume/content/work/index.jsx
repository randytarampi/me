import {PrintableSection} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumeWork from "../../../../../../../../src/lib/components/resume/content/work";
import ResumeWorkEntry from "../../../../../../../../src/lib/components/resume/content/work/entry";
import testResumeJson from "../../../../../../../../src/resumes/some-awesome-company";

describe("ResumeWork", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<ResumeWork resume={stubResume}/>);

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "work");
        expect(printableSection).to.have.prop("label", "Work");

        const workEntries = rendered.find(ResumeWorkEntry);
        expect(workEntries).to.have.length(stubResume.work.length);
    });
});
