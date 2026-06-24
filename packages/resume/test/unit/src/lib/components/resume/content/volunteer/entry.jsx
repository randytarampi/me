import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeVolunteerEntry from "../../../../../../../../src/lib/components/resume/content/volunteer/entry";

describe("ResumeVolunteerEntry", function () {
    let stubResumeVolunteerEntry;

    beforeEach(function () {
        stubResumeVolunteerEntry = {
            organization: "Organization",
            position: "President",
            website: "http://organization.com",
            startDate: "2013-01-01",
            endDate: "2014-01-01",
            summary: "Description...",
            highlights: [
                "Started the organization",
                "Sold the organization",
                "Profited like a boss",
                "Got comfortable",
                "Bought an island nation",
                "Ran it into the ground"
            ]
        };
    });

    it("renders", function () {
        const rendered = render(<ResumeVolunteerEntry volunteerEntry={stubResumeVolunteerEntry} index={0}/>);

        expect(rendered.container.firstElementChild?.classList.contains("hide-on-print")).to.eql(false);
        expect(rendered.container.querySelector(".resume-volunteer-entry")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-volunteer-entry__basics")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-volunteer-entry__date")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-volunteer-entry__organization")).to.not.eql(null);

        expect(rendered.container.querySelector(".resume-volunteer-entry__website")).to.not.eql(null);

        expect(rendered.container.querySelector(".resume-volunteer-entry__summary")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-volunteer-entry__highlights")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-volunteer-entry__highlight")).to.not.eql(null);
    });

    it("renders (no end date)", function () {
        delete stubResumeVolunteerEntry.endDate;

        const rendered = render(<ResumeVolunteerEntry volunteerEntry={stubResumeVolunteerEntry} index={0}/>);

        expect(rendered.container.querySelector(".resume-volunteer-entry__basics > .right.hide-on-small-only > .resume-volunteer-entry__date")?.innerHTML).to.match(/ to Present/);
        expect(rendered.container.querySelector(".resume-volunteer-entry__basics > .hide-on-med-and-up > .resume-volunteer-entry__date")?.innerHTML).to.match(/ to Present/);
    });

    it("renders (`.hide-on-print` if 4th or subsequent experience)", function () {
        const rendered = render(<ResumeVolunteerEntry volunteerEntry={stubResumeVolunteerEntry} index={4}/>);

        expect(rendered.container.firstElementChild?.classList.contains("hide-on-print")).to.eql(true);
    });

    it("renders (no `organization.website`)", function () {
        delete stubResumeVolunteerEntry.website;
        const rendered = render(<ResumeVolunteerEntry volunteerEntry={stubResumeVolunteerEntry} index={0}/>);


        expect(rendered.container.querySelector(".resume-volunteer-entry__organization")?.textContent).to.contain(stubResumeVolunteerEntry.organization);
        expect(rendered.container.querySelector(".resume-volunteer-entry__details > .right.hide-on-small-only")).to.eql(null);
    });

    it("renders (no `organization.highlights`)", function () {
        delete stubResumeVolunteerEntry.highlights;
        const rendered = render(<ResumeVolunteerEntry volunteerEntry={stubResumeVolunteerEntry} index={0}/>);


        expect(rendered.container.querySelector(".resume-volunteer-entry__highlights")).to.eql(null);
        expect(rendered.container.querySelector(".resume-volunteer-entry__highlight")).to.eql(null);
    });
});
