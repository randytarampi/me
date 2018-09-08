import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import ResumeAwardsEntry from "../../../../../../../public/components/resume/content/awards/entry";

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
        const rendered = shallow(<ResumeAwardsEntry awardsEntry={stubResumeAwardsEntry} index={0}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.not.have.className("hide-on-print");
        expect(rendered).to.have.descendants(".resume-awards-entry");
        expect(rendered).to.have.descendants(".resume-awards-entry__basics");
        expect(rendered).to.have.descendants(".resume-awards-entry__date");
        expect(rendered).to.have.descendants(".resume-awards-entry__title");
        expect(rendered).to.have.descendants(".resume-awards-entry__awarder");
        expect(rendered).to.have.descendants(".resume-awards-entry__summary");
        expect(rendered).to.have.descendants(".hide-on-med-and-up > .resume-awards-entry__date");
        expect(rendered).to.have.descendants(".right.hide-on-small-only > .resume-awards-entry__date");
    });

    it("renders (`.hide-on-print` if 4th or subsequent project)", function () {
        const rendered = shallow(<ResumeAwardsEntry awardsEntry={stubResumeAwardsEntry} index={4}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("hide-on-print");
    });
});
