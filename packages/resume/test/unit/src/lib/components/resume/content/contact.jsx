import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeContact from "../../../../../../../src/lib/components/resume/content/contact";
import testResumeJson from "../../../../../../../src/resumes/some-awesome-company";

describe("ResumeContact", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = render(<ResumeContact resume={stubResume}/>);

        expect(rendered.container.querySelector(".resume-contact__email")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-contact__tel")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-contact__web")).to.not.eql(null);

    });

    it("renders (no website)", function () {
        delete stubResume.basics.website;

        const rendered = render(<ResumeContact resume={stubResume}/>);

        expect(rendered.container.querySelector(".resume-contact__email")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-contact__tel")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-contact__web")).to.eql(null);

    });
});
