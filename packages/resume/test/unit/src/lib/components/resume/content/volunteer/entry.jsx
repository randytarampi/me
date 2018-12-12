import {CampaignLink} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
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
        const rendered = shallow(<ResumeVolunteerEntry volunteerEntry={stubResumeVolunteerEntry} index={0}/>);

        expect(rendered).to.not.have.className("hide-on-print");
        expect(rendered).to.have.descendants(".resume-volunteer-entry");
        expect(rendered).to.have.descendants(".resume-volunteer-entry__basics");
        expect(rendered).to.have.descendants(".resume-volunteer-entry__date");
        expect(rendered).to.have.descendants(".resume-volunteer-entry__organization");
        expect(rendered.find(CampaignLink)).to.be.ok;
        expect(rendered.find(CampaignLink)).to.have.length(2);
        expect(rendered.find(CampaignLink).first()).to.have.prop("href", stubResumeVolunteerEntry.website);
        expect(rendered.find(CampaignLink).first()).to.have.prop("text", stubResumeVolunteerEntry.organization);

        expect(rendered).to.have.descendants(".resume-volunteer-entry__website");
        expect(rendered.find(CampaignLink).last()).to.have.prop("href", stubResumeVolunteerEntry.website);
        expect(rendered.find(CampaignLink).last()).to.not.have.prop("text");

        expect(rendered).to.have.descendants(".resume-volunteer-entry__summary");
        expect(rendered).to.have.descendants(".resume-volunteer-entry__highlights");
        expect(rendered).to.have.descendants(".resume-volunteer-entry__highlight");
        expect(rendered.find(".resume-volunteer-entry__highlight")).to.have.length(stubResumeVolunteerEntry.highlights.length);
        expect(rendered.find(".resume-volunteer-entry__highlight.show-on-letter.show-on-a4")).to.have.length(3);
        expect(rendered.find(".resume-volunteer-entry__highlight.show-on-legal")).to.have.length(stubResumeVolunteerEntry.highlights.length - 3);
    });

    it("renders (no end date)", function () {
        delete stubResumeVolunteerEntry.endDate;

        const rendered = shallow(<ResumeVolunteerEntry volunteerEntry={stubResumeVolunteerEntry} index={0}/>);

        expect(rendered.find(".resume-volunteer-entry__basics > .right.hide-on-small-only > .resume-volunteer-entry__date").html()).to.match(/ to Present/);
        expect(rendered.find(".resume-volunteer-entry__basics > .hide-on-med-and-up > .resume-volunteer-entry__date").html()).to.match(/ to Present/);
    });

    it("renders (`.hide-on-print` if 4th or subsequent experience)", function () {
        const rendered = shallow(<ResumeVolunteerEntry volunteerEntry={stubResumeVolunteerEntry} index={4}/>);

        expect(rendered).to.have.className("hide-on-print");
    });

    it("renders (no `organization.website`)", function () {
        delete stubResumeVolunteerEntry.website;
        const rendered = shallow(<ResumeVolunteerEntry volunteerEntry={stubResumeVolunteerEntry} index={0}/>);


        expect(rendered.find(CampaignLink)).to.be.ok;
        expect(rendered.find(CampaignLink)).to.have.length(0);
        expect(rendered.find(".resume-volunteer-entry__organization")).to.contain(
            <span className="text">{stubResumeVolunteerEntry.organization}</span>
        );
        expect(rendered).to.not.have.descendants(".resume-volunteer-entry__details > .right.hide-on-small-only");
    });

    it("renders (no `organization.highlights`)", function () {
        delete stubResumeVolunteerEntry.highlights;
        const rendered = shallow(<ResumeVolunteerEntry volunteerEntry={stubResumeVolunteerEntry} index={0}/>);


        expect(rendered).to.not.have.descendants(".resume-volunteer-entry__highlights");
        expect(rendered).to.not.have.descendants(".resume-volunteer-entry__highlight");
    });
});
