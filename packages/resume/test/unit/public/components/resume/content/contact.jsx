import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import ResumeContact from "../../../../../../public/components/resume/content/contact";
import {Printable} from "@randy.tarampi/jsx";
import testResumeJson from "../../../../../resources/resume";

const {PrintableSection} = Printable;

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
