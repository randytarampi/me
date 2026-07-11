import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeAbout from "../../../../../../../src/lib/components/resume/content/about.jsx";
import testResumeJson from "../../../../../../../src/resumes/some-awesome-company";

describe("ResumeAbout", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = render(<ResumeAbout resume={stubResume}/>);

        expect(rendered.container.querySelector(".resume-about__summary")).to.not.eql(null);

    });
});
