import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeAwardsEntry from "../../../../../../../../src/lib/components/resume/content/awards/entry";

describe("ResumeAwardsEntry", function () {
    let stubResumeAwardsEntry;

    beforeEach(function () {
        stubResumeAwardsEntry = {
            "title": "Award",
            "date": "2014-11-01",
            "awarder": "Company",
            "summary": "There is no spoon."
        };
    });

    it("renders", function () {
        const rendered = render(<ResumeAwardsEntry awardsEntry={stubResumeAwardsEntry} index={0}/>);

        expect(rendered.container.firstElementChild?.classList.contains("hide-on-print")).to.eql(false);
        expect(rendered.container.querySelector(".resume-awards-entry")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-awards-entry__basics")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-awards-entry__date")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-awards-entry__title")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-awards-entry__awarder")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-awards-entry__summary")).to.not.eql(null);
        expect(rendered.container.querySelector(".hide-on-med-and-up > .resume-awards-entry__date")).to.not.eql(null);
        expect(rendered.container.querySelector(".right.hide-on-small-only > .resume-awards-entry__date")).to.not.eql(null);
    });

    it("renders (`.hide-on-print` if 4th or subsequent project)", function () {
        const rendered = render(<ResumeAwardsEntry awardsEntry={stubResumeAwardsEntry} index={4}/>);

        expect(rendered.container.firstElementChild?.classList.contains("hide-on-print")).to.eql(true);
    });
});
