import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeVolunteer from "../../../../../../../../src/lib/components/resume/content/volunteer";
import ResumeVolunteerEntry from "../../../../../../../../src/lib/components/resume/content/volunteer/entry";
import testResumeJson from "../../../../../../../../src/resumes/some-awesome-company.json";

describe("ResumeVolunteer", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = render(<ResumeVolunteer resume={stubResume}/>);
        const volunteerEntries = rendered.container.querySelectorAll(".resume-volunteer-entry");

        expect(volunteerEntries).to.have.length(stubResume.volunteer.length);
    });
});
