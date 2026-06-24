import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeSkills from "../../../../../../../../src/lib/components/resume/content/skills";
import ResumeSkillsEntry from "../../../../../../../../src/lib/components/resume/content/skills/entry";
import testResumeJson from "../../../../../../../../src/resumes/some-awesome-company.json";

describe("ResumeSkills", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = render(<ResumeSkills resume={stubResume}/>);
        const skillsEntries = rendered.container.querySelectorAll(".resume-skills-entry");

        expect(skillsEntries).to.have.length(stubResume.skills.length);
    });
});
