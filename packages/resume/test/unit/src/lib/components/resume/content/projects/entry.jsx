import {CampaignLink} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumeProjectsEntry from "../../../../../../../../src/lib/components/resume/content/projects/entry";

describe("ResumeProjectsEntry", function () {
    let stubResumeProjectsEntry;

    beforeEach(function () {
        stubResumeProjectsEntry = {
            name: "My blog",
            description: "It's a blog",
            highlights: [
                "My choice of technologies here was largely driven by my want to minimize costs",
                "It's all on the AWS Free Tier",
                "The only thing I'm paying for is DNS",
                "Code is hosted on GitHub Pages",
                "CI & CD provided by Travis"
            ],
            startDate: "2018-08-01",
            endDate: "2018-08-01",
            roles: [
                "Developer"
            ],
            entity: "Me, myself & I",
            type: "Application",
            url: "https://www.randytarampi.ca/blog"
        };
    });

    it("renders", function () {
        const rendered = shallow(<ResumeProjectsEntry projectsEntry={stubResumeProjectsEntry} index={0}/>);

        expect(rendered).to.not.have.className("hide-on-print");
        expect(rendered).to.have.descendants(".resume-projects-entry");
        expect(rendered).to.have.descendants(".resume-projects-entry__basics");
        expect(rendered).to.have.descendants(".resume-projects-entry__date");
        expect(rendered).to.have.descendants(".resume-projects-entry__name");
        expect(rendered.find(CampaignLink)).to.be.ok;
        expect(rendered.find(CampaignLink)).to.have.length(2);
        expect(rendered.find(CampaignLink).first()).to.have.prop("href", stubResumeProjectsEntry.url);
        expect(rendered.find(CampaignLink).first()).to.have.prop("text", stubResumeProjectsEntry.name);

        expect(rendered).to.have.descendants(".resume-projects-entry__website");
        expect(rendered.find(CampaignLink).last()).to.have.prop("href", stubResumeProjectsEntry.url);
        expect(rendered.find(CampaignLink).last()).to.not.have.prop("text");

        expect(rendered).to.have.descendants(".resume-projects-entry__details");
        expect(rendered).to.have.descendants(".resume-projects-entry__details > div > .resume-projects-entry__position");
        expect(rendered).to.have.descendants(".resume-projects-entry__description");
        expect(rendered).to.have.descendants(".resume-projects-entry__highlights");
        expect(rendered).to.have.descendants(".resume-projects-entry__highlight");
        expect(rendered.find(".resume-projects-entry__highlight")).to.have.length(stubResumeProjectsEntry.highlights.length);
        expect(rendered.find(".resume-projects-entry__highlight.show-on-letter.show-on-a4")).to.have.length(3);
        expect(rendered.find(".resume-projects-entry__highlight.show-on-legal")).to.have.length(stubResumeProjectsEntry.highlights.length - 3);
    });

    it("renders (no end date)", function () {
        delete stubResumeProjectsEntry.endDate;

        const rendered = shallow(<ResumeProjectsEntry projectsEntry={stubResumeProjectsEntry} index={0}/>);

        expect(rendered.find(".resume-projects-entry__basics > .right.hide-on-small-only > .resume-projects-entry__date").html()).to.match(/ to Present/);
        expect(rendered.find(".resume-projects-entry__basics > .hide-on-med-and-up > .resume-projects-entry__date").html()).to.match(/ to Present/);
    });

    it("renders (`.hide-on-print` if 4th or subsequent project)", function () {
        const rendered = shallow(<ResumeProjectsEntry projectsEntry={stubResumeProjectsEntry} index={4}/>);

        expect(rendered).to.have.className("hide-on-print");
    });

    it("renders (no `projectsEntry.url`)", function () {
        delete stubResumeProjectsEntry.url;
        const rendered = shallow(<ResumeProjectsEntry projectsEntry={stubResumeProjectsEntry} index={0}/>);


        expect(rendered.find(CampaignLink)).to.be.ok;
        expect(rendered.find(CampaignLink)).to.have.length(0);
        expect(rendered.find(".resume-projects-entry__name")).to.contain(
            <span className="text">{stubResumeProjectsEntry.name}</span>
        );
        expect(rendered).to.not.have.descendants(".resume-projects-entry__details > .right.hide-on-small-only");
    });

    it("renders (no `projectsEntry.highlights`)", function () {
        delete stubResumeProjectsEntry.highlights;
        const rendered = shallow(<ResumeProjectsEntry projectsEntry={stubResumeProjectsEntry} index={0}/>);


        expect(rendered).to.not.have.descendants(".resume-projects-entry__highlights");
        expect(rendered).to.not.have.descendants(".resume-projects-entry__highlight");
    });

    it("renders (no `projectsEntry.roles`)", function () {
        delete stubResumeProjectsEntry.roles;
        const rendered = shallow(<ResumeProjectsEntry projectsEntry={stubResumeProjectsEntry} index={0}/>);


        expect(rendered).to.have.descendants(".resume-projects-entry__details");
        expect(rendered).to.not.have.descendants(".resume-projects-entry__details > div > .resume-projects-entry__position");
    });
});
