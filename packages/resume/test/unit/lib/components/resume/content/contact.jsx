import {PrintableSection} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumeContact from "../../../../../../lib/components/resume/content/contact";
import testResumeJson from "../../../../../../resumes/test";

describe("ResumeContact", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<ResumeContact resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".resume-contact__email");
        expect(rendered).to.have.descendants(".resume-contact__tel");
        expect(rendered).to.have.descendants(".resume-contact__web");

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "contact");
        expect(printableSection).to.have.prop("label", "Contact");
    });

    it("renders (no website)", function () {
        delete stubResume.basics.website;

        const rendered = shallow(<ResumeContact resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.descendants(".resume-contact__email");
        expect(rendered).to.have.descendants(".resume-contact__tel");
        expect(rendered).to.not.have.descendants(".resume-contact__web");

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "contact");
        expect(printableSection).to.have.prop("label", "Contact");
    });
});
