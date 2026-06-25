import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeSkillsEntry from "../../../../../../../../src/lib/components/resume/content/skills/entry.jsx";
import ResumeSkill from "../../../../../../../../src/lib/skill.js";

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
                "Complaining about sales around the water cooler",
                "Complaining about C-levels around the water cooler"
            ]
        });
    });

    it("renders", function () {
        const rendered = render(<ResumeSkillsEntry skillsEntry={stubResumeSkillsEntry} index={0}/>);

        expect(rendered.container.firstElementChild?.classList.contains("resume-skills-entry")).to.eql(true);
        expect(rendered.container.firstElementChild?.classList.contains("hide-on-print")).to.eql(false);
        expect(rendered.container.querySelector(".resume-skills-entry")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-skills-entry__name")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-skills-entry__keywords")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-skills-entry__keyword")).to.not.eql(null);
    });

    it("renders (`.hide-on-print` if 4th or subsequent skill)", function () {
        const rendered = render(<ResumeSkillsEntry skillsEntry={stubResumeSkillsEntry} index={4}/>);

        expect(rendered.container.firstElementChild?.classList.contains("resume-skills-entry")).to.eql(true);
        expect(rendered.container.firstElementChild?.classList.contains("hide-on-print")).to.eql(true);
    });

    it("renders (`.hide-on-print` if 8th or subsequent keyword)", function () {
        const rendered = render(<ResumeSkillsEntry skillsEntry={stubResumeSkillsEntry} index={4}/>);

        expect(rendered.container.querySelector(".resume-skills-entry__keyword.hide-on-print")).to.not.eql(null);
    });

    it("renders (no `skillsEntry.keywords`)", function () {
        stubResumeSkillsEntry = stubResumeSkillsEntry.set("keywords", null);

        const rendered = render(<ResumeSkillsEntry skillsEntry={stubResumeSkillsEntry} index={4}/>);

        expect(rendered.container.firstElementChild?.classList.contains(".resume-skills-entry__keywords")).to.eql(false);
        expect(rendered.container.firstElementChild?.classList.contains(".resume-skills-entry__keyword")).to.eql(false);
    });
});
