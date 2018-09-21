import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumeSkillsEntry from "../../../../../../../../src/lib/components/resume/content/skills/entry";
import ResumeSkill from "../../../../../../../../src/lib/skill";

describe("ResumeSkillsEntry", function () {
    let stubResumeSkillsEntry;

    beforeEach(function () {
        stubResumeSkillsEntry = ResumeSkill.fromJS({
            "name": "Web Development",
            "level": "Master",
            "keywords": [
                "HTML",
                "CSS",
                "Javascript",
                "Yelling at a screen",
                "Getting yelled at by clients",
                "Complaining about clients around the water cooler",
                "Complaining about sales around the water cooler"
            ]
        });
    });

    it("renders", function () {
        const rendered = shallow(<ResumeSkillsEntry skillsEntry={stubResumeSkillsEntry} index={0}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("resume-skills-entry");
        expect(rendered).to.not.have.className("hide-on-print");
        expect(rendered).to.have.descendants(".resume-skills-entry");
        expect(rendered).to.have.descendants(".resume-skills-entry__name");
        expect(rendered).to.have.descendants(".resume-skills-entry__keywords");
        expect(rendered).to.have.descendants(".resume-skills-entry__keyword");
        expect(rendered.find(".resume-skills-entry__keyword")).to.have.length(stubResumeSkillsEntry.keywords.size);
        expect(rendered.find(".resume-skills-entry__keyword.hide-on-print")).to.have.length(stubResumeSkillsEntry.keywords.size - 6);
    });

    it("renders (`.hide-on-print` if 4th or subsequent skill)", function () {
        const rendered = shallow(<ResumeSkillsEntry skillsEntry={stubResumeSkillsEntry} index={4}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("resume-skills-entry");
        expect(rendered).to.have.className("hide-on-print");
    });

    it("renders (`.hide-on-print` if 7th or subsequent keyword)", function () {
        const rendered = shallow(<ResumeSkillsEntry skillsEntry={stubResumeSkillsEntry} index={4}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".resume-skills-entry__keyword.hide-on-print");
    });

    it("renders (no `skillsEntry.keywords`)", function () {
        stubResumeSkillsEntry = stubResumeSkillsEntry.set("keywords", null);

        const rendered = shallow(<ResumeSkillsEntry skillsEntry={stubResumeSkillsEntry} index={4}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.not.have.className(".resume-skills-entry__keywords");
        expect(rendered).to.not.have.className(".resume-skills-entry__keyword");
    });
});
