import {PrintableSection} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumeInterests from "../../../../../../../src/lib/components/resume/content/interests";
import Resume from "../../../../../../../src/lib/resume";
import testResumeJson from "../../../../../../../src/resumes/some-awesome-company";

describe("ResumeInterests", function () {
    let stubResume;

    beforeEach(function () {
        stubResume = Resume.fromResume(testResumeJson);
    });

    it("renders", function () {
        const rendered = shallow(<ResumeInterests resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".resume-interests__interest-entry");
        expect(rendered).to.have.descendants(".resume-interests__interest");
        expect(rendered).to.have.descendants(".resume-interests__keywords");
        expect(rendered).to.have.descendants(".resume-interests__keyword");
        expect(rendered.find(".resume-interests__interest-entry")).to.have.length(stubResume.interests.size);

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "interests");
        expect(printableSection).to.have.prop("label", "Interests");
    });

    it("renders (`.hide-on-print` on the 4th and subsequent interests)", function () {
        const rendered = shallow(<ResumeInterests resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".resume-interests__interest-entry");
        expect(rendered).to.have.descendants(".resume-interests__interest");
        expect(rendered).to.have.descendants(".resume-interests__keywords");
        expect(rendered).to.have.descendants(".resume-interests__keyword");
        expect(rendered.find(".resume-interests__interest-entry")).to.have.length(stubResume.interests.size);
        expect(rendered.find(".resume-interests__interest-entry.hide-on-print")).to.have.length(1);
    });

    it("renders (`.show-on-legal` on the 5th and subsequent interest keyword)", function () {
        const rendered = shallow(<ResumeInterests resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".resume-interests__interest-entry");
        expect(rendered).to.have.descendants(".resume-interests__interest");
        expect(rendered).to.have.descendants(".resume-interests__keywords");
        expect(rendered).to.have.descendants(".resume-interests__keyword");
        expect(rendered.find(".resume-interests__keyword")).to.have.length(stubResume.interests.reduce((keywordCount, interest) => keywordCount += interest.keywords.size, 0));
        expect(rendered.find(".resume-interests__keyword.show-on-legal")).to.have.length(1);
    });
});
