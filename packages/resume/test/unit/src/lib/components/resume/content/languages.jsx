import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeLanguages from "../../../../../../../src/lib/components/resume/content/languages";
import testResumeJson from "../../../../../../../src/resumes/some-awesome-company";

describe("ResumeLanguages", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = render(<ResumeLanguages resume={stubResume}/>);

        expect(rendered.container.querySelector(".resume-languages__language-entry")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-languages__language")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-languages__fluency")).to.not.eql(null);

    });
});
