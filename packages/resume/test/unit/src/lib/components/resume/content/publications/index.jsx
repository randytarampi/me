import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumePublications from "../../../../../../../../src/lib/components/resume/content/publications";
import ResumePublicationsEntry from "../../../../../../../../src/lib/components/resume/content/publications/entry";
import testResumeJson from "../../../../../../../../src/resumes/some-awesome-company.json";

describe("ResumePublications", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = render(<ResumePublications resume={stubResume}/>);
        const publicationsEntries = rendered.container.querySelectorAll(".resume-publications-entry");

        expect(publicationsEntries).to.have.length(stubResume.publications.length);
    });
});
