import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeWork from "../../../../../../../../src/lib/components/resume/content/work";
import ResumeWorkEntry from "../../../../../../../../src/lib/components/resume/content/work/entry";
import testResumeJson from "../../../../../../../../src/resumes/some-awesome-company.json";

describe("ResumeWork", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = render(<ResumeWork resume={stubResume}/>);
        const workEntries = rendered.container.querySelectorAll(".resume-work-entry");

        expect(workEntries).to.have.length(stubResume.work.length);
    });
});
