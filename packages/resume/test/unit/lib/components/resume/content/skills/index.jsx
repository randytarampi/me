import {PrintableSection} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumeSkills from "../../../../../../../lib/components/resume/content/skills";
import ResumeSkillsEntry from "../../../../../../../lib/components/resume/content/skills/entry";
import testResumeJson from "../../../../../../../resumes/test";

describe("ResumeSkills", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<ResumeSkills resume={stubResume}/>);

        expect(rendered).to.be.ok;

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "skills");
        expect(printableSection).to.have.prop("label", "Skills");

        const skillsEntries = rendered.find(ResumeSkillsEntry);
        expect(skillsEntries).to.have.length(stubResume.skills.length);
    });
});
