import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import ResumeSkills from "../../../../../../../public/components/resume/content/skills";
import ResumeSkillsEntry from "../../../../../../../public/components/resume/content/skills/entry";
import {Printable} from "@randy.tarampi/jsx";
import testResumeJson from "../../../../../../resources/resume";

const {PrintableSection} = Printable;

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
