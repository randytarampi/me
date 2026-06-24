import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeEducation from "../../../../../../../../src/lib/components/resume/content/education";
import ResumeEducationEntry from "../../../../../../../../src/lib/components/resume/content/education/entry";
import testResumeJson from "../../../../../../../../src/resumes/some-awesome-company.json";

describe("ResumeEducation", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = render(<ResumeEducation resume={stubResume}/>);
        const educationEntries = rendered.container.querySelectorAll(".resume-education-entry");

        expect(educationEntries).to.have.length(stubResume.education.length);
    });
});
