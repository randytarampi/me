import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeReferences from "../../../../../../../src/lib/components/resume/content/references";
import testResumeJson from "../../../../../../../src/resumes/some-awesome-company";

describe("ResumeReferences", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = render(<ResumeReferences resume={stubResume}/>);

        expect(rendered.container.querySelector(".resume-references__reference")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-references__reference-quote")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-references__reference-referee")).to.not.eql(null);

    });
});
