import {Printable} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumePublications from "../../../../../../../lib/components/resume/content/publications";
import ResumePublicationsEntry from "../../../../../../../lib/components/resume/content/publications/entry";
import testResumeJson from "../../../../../../resources/resume";

const {PrintableSection} = Printable;

describe("ResumePublications", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<ResumePublications resume={stubResume}/>);

        expect(rendered).to.be.ok;

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "publications");
        expect(printableSection).to.have.prop("label", "Publications");

        const publicationsEntries = rendered.find(ResumePublicationsEntry);
        expect(publicationsEntries).to.have.length(stubResume.publications.length);
    });
});
