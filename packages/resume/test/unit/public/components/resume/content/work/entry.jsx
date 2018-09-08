import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import ResumeWorkEntry from "../../../../../../../public/components/resume/content/work/entry";
import {CampaignLink} from "@randy.tarampi/jsx";

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
        const rendered = shallow(<ResumeWorkEntry workEntry={stubResumeWorkEntry} index={0}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.not.have.className("hide-on-print");
        expect(rendered).to.have.descendants(".resume-work-entry");
        expect(rendered).to.have.descendants(".resume-work-entry__basics");
        expect(rendered).to.have.descendants(".resume-work-entry__date");
        expect(rendered).to.have.descendants(".resume-work-entry__company");
        expect(rendered.find(CampaignLink)).to.be.ok;
        expect(rendered.find(CampaignLink)).to.have.length(2);
        expect(rendered.find(CampaignLink).first()).to.have.prop("href", stubResumeWorkEntry.website);
        expect(rendered.find(CampaignLink).first()).to.have.prop("text", stubResumeWorkEntry.company);

        expect(rendered).to.have.descendants(".resume-work-entry__website");
        expect(rendered.find(CampaignLink).last()).to.have.prop("href", stubResumeWorkEntry.website);
        expect(rendered.find(CampaignLink).last()).to.not.have.prop("text");

        expect(rendered).to.have.descendants(".resume-work-entry__summary");
        expect(rendered).to.have.descendants(".resume-work-entry__highlights");
        expect(rendered).to.have.descendants(".resume-work-entry__highlight");
        expect(rendered.find(".resume-work-entry__highlight")).to.have.length(stubResumeWorkEntry.highlights.length);
        expect(rendered.find(".resume-work-entry__highlight.show-on-letter.show-on-a4")).to.have.length(3);
        expect(rendered.find(".resume-work-entry__highlight.show-on-legal")).to.have.length(stubResumeWorkEntry.highlights.length - 3);
    });

    it("renders (no end date)", function () {
        delete stubResumeWorkEntry.endDate;

        const rendered = shallow(<ResumeWorkEntry workEntry={stubResumeWorkEntry} index={0}/>);

        expect(rendered).to.be.ok;
        expect(rendered.find(".resume-work-entry__basics > .right.hide-on-small-only > .resume-work-entry__date").html()).to.match(/ to Present/);
        expect(rendered.find(".resume-work-entry__basics > .hide-on-med-and-up > .resume-work-entry__date").html()).to.match(/ to Present/);
    });

    it("renders (`.hide-on-print` if 4th or subsequent job)", function () {
        const rendered = shallow(<ResumeWorkEntry workEntry={stubResumeWorkEntry} index={4}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("hide-on-print");
    });

    it("renders (no `company.website`)", function () {
        delete stubResumeWorkEntry.website;
        const rendered = shallow(<ResumeWorkEntry workEntry={stubResumeWorkEntry} index={0}/>);

        expect(rendered).to.be.ok;

        expect(rendered.find(CampaignLink)).to.be.ok;
        expect(rendered.find(CampaignLink)).to.have.length(0);
        expect(rendered.find(".resume-work-entry__company")).to.contain(
            <span className="text">{stubResumeWorkEntry.company}</span>
        );
        expect(rendered).to.not.have.descendants(".resume-work-entry__details > .right.hide-on-small-only");
    });

    it("renders (no `company.highlights`)", function () {
        delete stubResumeWorkEntry.highlights;
        const rendered = shallow(<ResumeWorkEntry workEntry={stubResumeWorkEntry} index={0}/>);

        expect(rendered).to.be.ok;

        expect(rendered).to.not.have.descendants(".resume-work-entry__highlights");
        expect(rendered).to.not.have.descendants(".resume-work-entry__highlight");
    });
});
