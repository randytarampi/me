import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeAwards from "../../../../../../../../src/lib/components/resume/content/awards/index.jsx";
import ResumeAwardsEntry from "../../../../../../../../src/lib/components/resume/content/awards/entry.jsx";
import testResumeJson from "../../../../../../../../src/resumes/some-awesome-company.json";

describe("ResumeAwards", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = render(<ResumeAwards resume={stubResume}/>);
        const awardsEntries = rendered.container.querySelectorAll(".resume-awards-entry");

        expect(awardsEntries).to.have.length(stubResume.awards.length);
    });
});
