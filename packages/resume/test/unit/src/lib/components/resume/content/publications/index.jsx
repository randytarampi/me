import {PrintableSection} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumePublications from "../../../../../../../../src/lib/components/resume/content/publications";
import ResumePublicationsEntry from "../../../../../../../../src/lib/components/resume/content/publications/entry";
import testResumeJson from "../../../../../../../../src/resumes/some-awesome-company";

describe("ResumePublications", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<ResumePublications resume={stubResume}/>);

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "publications");
        expect(printableSection).to.have.prop("label", "Publications");

        const publicationsEntries = rendered.find(ResumePublicationsEntry);
        expect(publicationsEntries).to.have.length(stubResume.publications.length);
    });
});
