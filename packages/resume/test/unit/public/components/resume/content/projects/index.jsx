import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import ResumeProjects from "../../../../../../../public/components/resume/content/projects";
import ResumeProjectsEntry from "../../../../../../../public/components/resume/content/projects/entry";
import {Printable} from "@randy.tarampi/jsx";
import testResumeJson from "../../../../../../resources/resume";

const {PrintableSection} = Printable;

describe("ResumeProjects", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<ResumeProjects resume={stubResume}/>);

        expect(rendered).to.be.ok;

        const printableSection = rendered.find(PrintableSection);
        expect(printableSection).to.have.length(1);
        expect(printableSection).to.have.prop("printableType", "resume");
        expect(printableSection).to.have.prop("type", "projects");
        expect(printableSection).to.have.prop("label", "Projects");

        const projectsEntries = rendered.find(ResumeProjectsEntry);
        expect(projectsEntries).to.have.length(stubResume.projects.length);
    });
});
