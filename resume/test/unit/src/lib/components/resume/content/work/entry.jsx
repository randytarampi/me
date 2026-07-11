import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeWorkEntry from "../../../../../../../../src/lib/components/resume/content/work/entry.jsx";

describe("ResumeWorkEntry", function () {
    let stubResumeWorkEntry;

    beforeEach(function () {
        stubResumeWorkEntry = {
            company: "Company",
            position: "President",
            website: "http://company.com",
            startDate: "2013-01-01",
            endDate: "2014-01-01",
            summary: "Description...",
            highlights: [
                "Started the company",
                "Sold the company",
                "Profited like a boss",
                "Got comfortable",
                "Bought an island nation",
                "Ran it into the ground"
            ]
        };
    });

    it("renders", function () {
        const rendered = render(<ResumeWorkEntry workEntry={stubResumeWorkEntry} index={0}/>);

        expect(rendered.container.firstElementChild?.classList.contains("hide-on-print")).to.eql(false);
        expect(rendered.container.querySelector(".resume-work-entry")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-work-entry__basics")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-work-entry__date")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-work-entry__company")).to.not.eql(null);

        expect(rendered.container.querySelector(".resume-work-entry__website")).to.not.eql(null);

        expect(rendered.container.querySelector(".resume-work-entry__summary")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-work-entry__highlights")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-work-entry__highlight")).to.not.eql(null);
    });

    it("renders (no end date)", function () {
        delete stubResumeWorkEntry.endDate;

        const rendered = render(<ResumeWorkEntry workEntry={stubResumeWorkEntry} index={0}/>);

        expect(rendered.container.querySelector(".resume-work-entry__basics > .right.hide-on-small-only > .resume-work-entry__date")?.innerHTML).to.match(/ to Present/);
        expect(rendered.container.querySelector(".resume-work-entry__basics > .hide-on-med-and-up > .resume-work-entry__date")?.innerHTML).to.match(/ to Present/);
    });

    it("renders (`.hide-on-print` if 4th or subsequent job)", function () {
        const rendered = render(<ResumeWorkEntry workEntry={stubResumeWorkEntry} index={4}/>);

        expect(rendered.container.firstElementChild?.classList.contains("hide-on-print")).to.eql(true);
    });

    it("renders (no `company.website`)", function () {
        delete stubResumeWorkEntry.website;
        const rendered = render(<ResumeWorkEntry workEntry={stubResumeWorkEntry} index={0}/>);


        expect(rendered.container.querySelector(".resume-work-entry__company")?.textContent).to.contain(stubResumeWorkEntry.company);
        expect(rendered.container.querySelector(".resume-work-entry__details > .right.hide-on-small-only")).to.eql(null);
    });

    it("renders (no `company.highlights`)", function () {
        delete stubResumeWorkEntry.highlights;
        const rendered = render(<ResumeWorkEntry workEntry={stubResumeWorkEntry} index={0}/>);


        expect(rendered.container.querySelector(".resume-work-entry__highlights")).to.eql(null);
        expect(rendered.container.querySelector(".resume-work-entry__highlight")).to.eql(null);
    });
});
