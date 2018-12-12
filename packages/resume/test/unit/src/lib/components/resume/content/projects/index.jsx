import {PrintableSection} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumeProjects from "../../../../../../../../src/lib/components/resume/content/projects";
import ResumeProjectsEntry from "../../../../../../../../src/lib/components/resume/content/projects/entry";
import testResumeJson from "../../../../../../../../src/resumes/some-awesome-company";

describe("ResumeProjects", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<ResumeProjects resume={stubResume}/>);

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "projects");
        expect(printableSection).to.have.prop("label", "Projects");

        const projectsEntries = rendered.find(ResumeProjectsEntry);
        expect(projectsEntries).to.have.length(stubResume.projects.length);
    });
});
