import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeInterests from "../../../../../../../src/lib/components/resume/content/interests";
import Resume from "../../../../../../../src/lib/resume";
import testResumeJson from "../../../../../../../src/resumes/some-awesome-company";

describe("ResumeInterests", function () {
    let stubResume;

    beforeEach(function () {
        stubResume = Resume.fromResume(testResumeJson);
    });

    it("renders", function () {
        const rendered = render(<ResumeInterests resume={stubResume}/>);

        expect(rendered.container.querySelector(".resume-interests__interest-entry")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-interests__interest")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-interests__keywords")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-interests__keyword")).to.not.eql(null);

    });

    it("renders (`.hide-on-print` on the 4th and subsequent interests)", function () {
        const rendered = render(<ResumeInterests resume={stubResume}/>);

        expect(rendered.container.querySelector(".resume-interests__interest-entry")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-interests__interest")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-interests__keywords")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-interests__keyword")).to.not.eql(null);
    });

    it("renders (`.show-on-legal` on the 5th and subsequent interest keyword)", function () {
        const rendered = render(<ResumeInterests resume={stubResume}/>);

        expect(rendered.container.querySelector(".resume-interests__interest-entry")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-interests__interest")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-interests__keywords")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-interests__keyword")).to.not.eql(null);
    });
});
