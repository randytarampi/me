import {expect} from "chai";
import {render} from "@testing-library/react";
import {Map} from "immutable";
import React from "react";
import ResumeEducationEntry from "../../../../../../../../src/lib/components/resume/content/education/entry.jsx";
import {ResumeCustomPrintableSectionContent} from "../../../../../../../../src/lib/resumeCustomContent.js";

describe("ResumeEducationEntry", function () {
    let stubResumeEducationEntry;

    beforeEach(function () {
        stubResumeEducationEntry = {
            institution: "University",
            area: "Woofing and Meowing",
            studyType: "Bachelor",
            startDate: "2011-01-01",
            endDate: "2013-01-01",
            gpa: "4.33",
            courses: [
                "Woofing",
                "Meowing",
                "Grring",
                "Rawring",
                "Yelling",
                "Quietly speaking when asked"
            ],
            website: "woof://woof.woof/woof"
        };
    });

    it("renders", function () {
        const rendered = render(<ResumeEducationEntry educationEntry={stubResumeEducationEntry} index={0}/>);

        expect(rendered.container.firstElementChild?.classList.contains("hide-on-print")).to.eql(false);
        expect(rendered.container.querySelector(".resume-education-entry")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-education-entry__basics")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-education-entry__date")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-education-entry__institution")).to.not.eql(null);

        expect(rendered.container.querySelector(".resume-education-entry__details")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-education-entry__details > .right.hide-on-small-only > .resume-education-entry__area")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-education-entry__details > .hide-on-med-and-up > .resume-education-entry__area")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-education-entry__details > div > .resume-education-entry__study-type")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-education-entry__highlights")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-education-entry__highlight")).to.not.eql(null);
    });

    it("renders (obeys `customContentForType`)", function () {
        const stubCustomContentForType = new ResumeCustomPrintableSectionContent({
            meta: Map({
                maxPrintHighlights: 4
            })
        });
        const rendered = render(<ResumeEducationEntry educationEntry={stubResumeEducationEntry} index={0}
                                                       customContentForType={stubCustomContentForType}/>);

    });

    it("renders (no end date)", function () {
        delete stubResumeEducationEntry.endDate;

        const rendered = render(<ResumeEducationEntry educationEntry={stubResumeEducationEntry} index={0}/>);

        expect(rendered.container.querySelector(".resume-education-entry__basics > .right.hide-on-small-only > .resume-education-entry__date")?.innerHTML).to.match(/ to Present/);
        expect(rendered.container.querySelector(".resume-education-entry__basics > .hide-on-med-and-up > .resume-education-entry__date")?.innerHTML).to.match(/ to Present/);
    });

    it("renders (`.hide-on-print` if 4th or subsequent project)", function () {
        const rendered = render(<ResumeEducationEntry educationEntry={stubResumeEducationEntry} index={4}/>);

        expect(rendered.container.firstElementChild?.classList.contains("hide-on-print")).to.eql(true);
    });

    it("renders (no `educationEntry.website`)", function () {
        delete stubResumeEducationEntry.website;
        const rendered = render(<ResumeEducationEntry educationEntry={stubResumeEducationEntry} index={0}/>);


        expect(rendered.container.querySelector(".resume-education-entry__institution")?.textContent).to.contain(stubResumeEducationEntry.institution);
    });

    it("renders (no `educationEntry.courses`)", function () {
        delete stubResumeEducationEntry.courses;
        const rendered = render(<ResumeEducationEntry educationEntry={stubResumeEducationEntry} index={0}/>);


        expect(rendered.container.querySelector(".resume-education-entry__highlights")).to.eql(null);
        expect(rendered.container.querySelector(".resume-education-entry__highlight")).to.eql(null);
    });
});
