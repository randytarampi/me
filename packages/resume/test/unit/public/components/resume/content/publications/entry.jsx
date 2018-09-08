import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import ResumePublicationsEntry from "../../../../../../../public/components/resume/content/publications/entry";
import {CampaignLink} from "@randy.tarampi/jsx";

describe("ResumePublicationsEntry", function () {
    let stubResumePublicationsEntry;

    beforeEach(function () {
        stubResumePublicationsEntry = {
            name: "Publication",
            publisher: "Company",
            releaseDate: "2014-10-01",
            url: "http://publication.com",
            summary: "Description..."
        };
    });

    it("renders", function () {
        const rendered = shallow(<ResumePublicationsEntry publicationsEntry={stubResumePublicationsEntry} index={0}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.not.have.className("hide-on-print");
        expect(rendered).to.have.descendants(".resume-publications-entry");
        expect(rendered).to.have.descendants(".resume-publications-entry__basics");
        expect(rendered).to.have.descendants(".resume-publications-entry__date");
        expect(rendered).to.have.descendants(".resume-publications-entry__name");
        expect(rendered.find(CampaignLink)).to.be.ok;
        expect(rendered.find(CampaignLink)).to.have.length(2);
        expect(rendered.find(CampaignLink).first()).to.have.prop("href", stubResumePublicationsEntry.url);
        expect(rendered.find(CampaignLink).first()).to.have.prop("text", stubResumePublicationsEntry.name);

        expect(rendered).to.have.descendants(".resume-publications-entry__url");
        expect(rendered.find(CampaignLink).last()).to.have.prop("href", stubResumePublicationsEntry.url);
        expect(rendered.find(CampaignLink).last()).to.not.have.prop("text");

        expect(rendered).to.have.descendants(".resume-publications-entry__publisher");
        expect(rendered).to.have.descendants(".resume-publications-entry__summary");
    });

    it("renders (`.hide-on-print` if 4th or subsequent publication)", function () {
        const rendered = shallow(<ResumePublicationsEntry publicationsEntry={stubResumePublicationsEntry} index={4}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("hide-on-print");
    });

    it("renders (no `publicationsEntry.url`)", function () {
        delete stubResumePublicationsEntry.url;
        const rendered = shallow(<ResumePublicationsEntry publicationsEntry={stubResumePublicationsEntry} index={0}/>);

        expect(rendered).to.be.ok;

        expect(rendered.find(CampaignLink)).to.be.ok;
        expect(rendered.find(CampaignLink)).to.have.length(0);
        expect(rendered.find(".resume-publications-entry__name")).to.contain(
            <span className="text">{stubResumePublicationsEntry.name}</span>
        );
        expect(rendered).to.not.have.descendants(".resume-publications-entry__details > .right.hide-on-small-only");
    });
});
