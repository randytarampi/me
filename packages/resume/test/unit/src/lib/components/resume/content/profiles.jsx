import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeProfiles from "../../../../../../../src/lib/components/resume/content/profiles";
import testResumeJson from "../../../../../../../src/resumes/some-awesome-company.json";

describe("ResumeProfiles", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = render(<ResumeProfiles resume={stubResume}/>);

        expect(rendered.container.querySelector(".resume-profiles__profile")).to.not.eql(null);

    });

    it("renders (`ExistingLinkComponent` with `username`)", function () {
        const rendered = render(<ResumeProfiles resume={stubResume}/>);

        expect(rendered.container.querySelector(".resume-profiles__profile")).to.not.eql(null);

    });

    it("renders (`ExistingLinkComponent` with only `url`)", function () {
        const rendered = render(<ResumeProfiles resume={stubResume}/>);

        expect(rendered.container.querySelector(".resume-profiles__profile")).to.not.eql(null);

    });

    it("renders (`ExistingLinkComponent` with insufficient information)", function () {
        const rendered = render(<ResumeProfiles resume={stubResume}/>);

        expect(rendered.container.querySelector(".resume-profiles__profile")).to.not.eql(null);

        expect(rendered.container.innerHTML).to.not.contain(stubResume.basics.profiles[5].network);
    });

    it("renders (other profile with `url`)", function () {
        const rendered = render(<ResumeProfiles resume={stubResume}/>);

        expect(rendered.container.querySelector(".resume-profiles__profile")).to.not.eql(null);

    });

    it("renders (other profile with only `username`)", function () {
        const rendered = render(<ResumeProfiles resume={stubResume}/>);

        expect(rendered.container.querySelector(".resume-profiles__profile")).to.not.eql(null);

        expect(rendered.container.textContent).to.contain(stubResume.basics.profiles[2].username);
    });

    it("renders (other profile with insufficient information)", function () {
        const rendered = render(<ResumeProfiles resume={stubResume}/>);

        expect(rendered.container.querySelector(".resume-profiles__profile")).to.not.eql(null);

        expect(rendered.container.innerHTML).to.not.contain(stubResume.basics.profiles[4].network);
    });
});
