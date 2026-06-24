import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeProjects from "../../../../../../../../src/lib/components/resume/content/projects";
import ResumeProjectsEntry from "../../../../../../../../src/lib/components/resume/content/projects/entry";
import testResumeJson from "../../../../../../../../src/resumes/some-awesome-company.json";

describe("ResumeProjects", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = render(<ResumeProjects resume={stubResume}/>);
        const projectsEntries = rendered.container.querySelectorAll(".resume-projects-entry");

        expect(projectsEntries).to.have.length(stubResume.projects.length);
    });
});
