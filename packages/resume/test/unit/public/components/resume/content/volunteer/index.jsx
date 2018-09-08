import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import ResumeVolunteer from "../../../../../../../public/components/resume/content/volunteer";
import ResumeVolunteerEntry from "../../../../../../../public/components/resume/content/volunteer/entry";
import {Printable} from "@randy.tarampi/jsx";
import testResumeJson from "../../../../../../resources/resume";

const {PrintableSection} = Printable;

describe("ResumeVolunteer", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<ResumeVolunteer resume={stubResume}/>);

        expect(rendered).to.be.ok;

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "volunteer");
        expect(printableSection).to.have.prop("label", "Volunteering");

        const volunteerEntries = rendered.find(ResumeVolunteerEntry);
        expect(volunteerEntries).to.have.length(stubResume.volunteer.length);
    });
});
