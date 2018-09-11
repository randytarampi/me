import {Printable} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumeAwards from "../../../../../../../lib/components/resume/content/awards";
import ResumeAwardsEntry from "../../../../../../../lib/components/resume/content/awards/entry";
import testResumeJson from "../../../../../../resources/resume";

const {PrintableSection} = Printable;

describe("ResumeAwards", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<ResumeAwards resume={stubResume}/>);

        expect(rendered).to.be.ok;

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "awards");
        expect(printableSection).to.have.prop("label", "Awards");

        const awardsEntries = rendered.find(ResumeAwardsEntry);
        expect(awardsEntries).to.have.length(stubResume.awards.length);
    });
});
