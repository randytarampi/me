import {PrintableHeader} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ResumeComponent from "../../../../../lib/components/resume";
import ResumeAbout from "../../../../../lib/components/resume/content/about";
import ResumeAwards from "../../../../../lib/components/resume/content/awards";
import ResumeContact from "../../../../../lib/components/resume/content/contact";
import ResumeEducation from "../../../../../lib/components/resume/content/education";
import ResumeInterests from "../../../../../lib/components/resume/content/interests";
import ResumeLanguages from "../../../../../lib/components/resume/content/languages";
import ResumeProfiles from "../../../../../lib/components/resume/content/profiles";
import ResumeProjects from "../../../../../lib/components/resume/content/projects";
import ResumePublications from "../../../../../lib/components/resume/content/publications";
import ResumeReferences from "../../../../../lib/components/resume/content/references";
import ResumeSkills from "../../../../../lib/components/resume/content/skills";
import ResumeVolunteer from "../../../../../lib/components/resume/content/volunteer";
import ResumeWork from "../../../../../lib/components/resume/content/work";
import ResumeFooter from "../../../../../lib/components/resume/footer";
import testResumeJson from "../../../../resources/resume";

describe("ResumeComponent", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<ResumeComponent resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeAbout`)", function () {
        delete stubResume.basics.summary;

        const rendered = shallow(<ResumeComponent resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeProfiles`)", function () {
        delete stubResume.basics.profiles;

        const rendered = shallow(<ResumeComponent resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeWork`)", function () {
        delete stubResume.work;

        const rendered = shallow(<ResumeComponent resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeProjects`)", function () {
        delete stubResume.projects;

        const rendered = shallow(<ResumeComponent resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeSkills`)", function () {
        delete stubResume.skills;

        const rendered = shallow(<ResumeComponent resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeEducation`)", function () {
        delete stubResume.education;

        const rendered = shallow(<ResumeComponent resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeAwards`)", function () {
        delete stubResume.awards;

        const rendered = shallow(<ResumeComponent resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeVolunteer`)", function () {
        delete stubResume.volunteer;

        const rendered = shallow(<ResumeComponent resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumePublications`)", function () {
        delete stubResume.publications;

        const rendered = shallow(<ResumeComponent resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeLanguages`)", function () {
        delete stubResume.languages;

        const rendered = shallow(<ResumeComponent resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeInterests`)", function () {
        delete stubResume.interests;

        const rendered = shallow(<ResumeComponent resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeReferences`)", function () {
        delete stubResume.references;

        const rendered = shallow(<ResumeComponent resume={stubResume}/>);

        expect(rendered).to.be.ok;
        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });
});
