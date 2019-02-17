import {CampaignLink} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import {Map} from "immutable";
import React from "react";
import ResumeEducationEntry from "../../../../../../../../src/lib/components/resume/content/education/entry";
import {ResumeCustomPrintableSectionContent} from "../../../../../../../../src/lib/resumeCustomContent";

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
        const rendered = shallow(<ResumeEducationEntry educationEntry={stubResumeEducationEntry} index={0}/>);

        expect(rendered).to.not.have.className("hide-on-print");
        expect(rendered).to.have.descendants(".resume-education-entry");
        expect(rendered).to.have.descendants(".resume-education-entry__basics");
        expect(rendered).to.have.descendants(".resume-education-entry__date");
        expect(rendered).to.have.descendants(".resume-education-entry__institution");
        expect(rendered.find(CampaignLink)).to.be.ok;
        expect(rendered.find(CampaignLink)).to.have.length(1);
        expect(rendered.find(CampaignLink)).to.have.prop("href", stubResumeEducationEntry.website);
        expect(rendered.find(CampaignLink)).to.have.prop("text", stubResumeEducationEntry.institution);

        expect(rendered).to.have.descendants(".resume-education-entry__details");
        expect(rendered).to.have.descendants(".resume-education-entry__details > .right.hide-on-small-only > .resume-education-entry__area");
        expect(rendered).to.have.descendants(".resume-education-entry__details > .hide-on-med-and-up > .resume-education-entry__area");
        expect(rendered).to.have.descendants(".resume-education-entry__details > div > .resume-education-entry__study-type");
        expect(rendered).to.have.descendants(".resume-education-entry__highlights");
        expect(rendered).to.have.descendants(".resume-education-entry__highlight");
        expect(rendered.find(".resume-education-entry__highlight")).to.have.length(stubResumeEducationEntry.courses.length);
        expect(rendered.find(".resume-education-entry__highlight.hide-on-print")).to.have.length(stubResumeEducationEntry.courses.length - 4);
    });

    it("renders (obeys `customContentForType`)", function () {
        const stubCustomContentForType = new ResumeCustomPrintableSectionContent({
            meta: Map({
                maxPrintHighlights: 4
            })
        });
        const rendered = shallow(<ResumeEducationEntry educationEntry={stubResumeEducationEntry} index={0}
                                                       customContentForType={stubCustomContentForType}/>);

        expect(rendered.find(".resume-education-entry__highlight")).to.have.length(stubResumeEducationEntry.courses.length);
        expect(rendered.find(".resume-education-entry__highlight.hide-on-print")).to.have.length(stubResumeEducationEntry.courses.length - (stubCustomContentForType.meta.get("maxPrintHighlights") + 1));
    });

    it("renders (no end date)", function () {
        delete stubResumeEducationEntry.endDate;

        const rendered = shallow(<ResumeEducationEntry educationEntry={stubResumeEducationEntry} index={0}/>);

        expect(rendered.find(".resume-education-entry__basics > .right.hide-on-small-only > .resume-education-entry__date").html()).to.match(/ to Present/);
        expect(rendered.find(".resume-education-entry__basics > .hide-on-med-and-up > .resume-education-entry__date").html()).to.match(/ to Present/);
    });

    it("renders (`.hide-on-print` if 4th or subsequent project)", function () {
        const rendered = shallow(<ResumeEducationEntry educationEntry={stubResumeEducationEntry} index={4}/>);

        expect(rendered).to.have.className("hide-on-print");
    });

    it("renders (no `educationEntry.website`)", function () {
        delete stubResumeEducationEntry.website;
        const rendered = shallow(<ResumeEducationEntry educationEntry={stubResumeEducationEntry} index={0}/>);


        expect(rendered.find(CampaignLink)).to.be.ok;
        expect(rendered.find(CampaignLink)).to.have.length(0);
        expect(rendered.find(".resume-education-entry__institution")).to.contain(
            <span className="text">{stubResumeEducationEntry.institution}</span>
        );
    });

    it("renders (no `educationEntry.courses`)", function () {
        delete stubResumeEducationEntry.courses;
        const rendered = shallow(<ResumeEducationEntry educationEntry={stubResumeEducationEntry} index={0}/>);


        expect(rendered).to.not.have.descendants(".resume-education-entry__highlights");
        expect(rendered).to.not.have.descendants(".resume-education-entry__highlight");
    });
});
