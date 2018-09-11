import {CampaignLink, Printable, StackOverflowLink, TwitterLink} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumeProfiles from "../../../../../../lib/components/resume/content/profiles";
import testResumeJson from "../../../../../resources/resume";

const {PrintableSection} = Printable;

describe("ResumeProfiles", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<ResumeProfiles resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".resume-profiles__profile");
        expect(rendered.find(".resume-profiles__profile")).to.have.length(stubResume.basics.profiles.length - 2);

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "profiles");
        expect(printableSection).to.have.prop("label", "Profiles");
    });

    it("renders (`ExistingLinkComponent` with `username`)", function () {
        const rendered = shallow(<ResumeProfiles resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".resume-profiles__profile");
        expect(rendered.find(".resume-profiles__profile")).to.have.length(stubResume.basics.profiles.length - 2);

        const stackOverflowLink = rendered.find(StackOverflowLink);
        expect(stackOverflowLink).to.have.length(1);
        expect(stackOverflowLink).to.have.prop("username", stubResume.basics.profiles[3].username);
    });

    it("renders (`ExistingLinkComponent` with only `url`)", function () {
        const rendered = shallow(<ResumeProfiles resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".resume-profiles__profile");
        expect(rendered.find(".resume-profiles__profile")).to.have.length(stubResume.basics.profiles.length - 2);

        const stackOverflowLink = rendered.find(TwitterLink);
        expect(stackOverflowLink).to.have.length(1);
        expect(stackOverflowLink).to.have.prop("href", stubResume.basics.profiles[0].url);
    });

    it("renders (`ExistingLinkComponent` with insufficient information)", function () {
        const rendered = shallow(<ResumeProfiles resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".resume-profiles__profile");
        expect(rendered.find(".resume-profiles__profile")).to.have.length(stubResume.basics.profiles.length - 2);

        expect(rendered.html()).to.not.contain(stubResume.basics.profiles[5].network);
    });

    it("renders (other profile with `url`)", function () {
        const rendered = shallow(<ResumeProfiles resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".resume-profiles__profile");
        expect(rendered.find(".resume-profiles__profile")).to.have.length(stubResume.basics.profiles.length - 2);

        const stackOverflowLink = rendered.find(CampaignLink);
        expect(stackOverflowLink).to.have.length(1);
        expect(stackOverflowLink).to.have.prop("href", stubResume.basics.profiles[1].url);
        expect(stackOverflowLink).to.have.prop("text", stubResume.basics.profiles[1].username);
    });

    it("renders (other profile with only `username`)", function () {
        const rendered = shallow(<ResumeProfiles resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".resume-profiles__profile");
        expect(rendered.find(".resume-profiles__profile")).to.have.length(stubResume.basics.profiles.length - 2);

        expect(rendered).to.contain(<span>{stubResume.basics.profiles[2]}</span>);
    });

    it("renders (other profile with insufficient information)", function () {
        const rendered = shallow(<ResumeProfiles resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".resume-profiles__profile");
        expect(rendered.find(".resume-profiles__profile")).to.have.length(stubResume.basics.profiles.length - 2);

        expect(rendered.html()).to.not.contain(stubResume.basics.profiles[4].network);
    });
});
