import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import Resume from "../../../../../public/components/resume";
import ResumeFooter from "../../../../../public/components/resume/footer";
import ResumeAwards from "../../../../../public/components/resume/content/awards";
import ResumeEducation from "../../../../../public/components/resume/content/education";
import ResumeProjects from "../../../../../public/components/resume/content/projects";
import ResumePublications from "../../../../../public/components/resume/content/publications";
import ResumeSkills from "../../../../../public/components/resume/content/skills";
import ResumeVolunteer from "../../../../../public/components/resume/content/volunteer";
import ResumeWork from "../../../../../public/components/resume/content/work";
import ResumeAbout from "../../../../../public/components/resume/content/about";
import ResumeContact from "../../../../../public/components/resume/content/contact";
import ResumeInterests from "../../../../../public/components/resume/content/interests";
import ResumeLanguages from "../../../../../public/components/resume/content/languages";
import ResumeProfiles from "../../../../../public/components/resume/content/profiles";
import ResumeReferences from "../../../../../public/components/resume/content/references";
import {Printable} from "@randy.tarampi/jsx";
import testResumeJson from "../../../../resources/resume";

const {PrintableHeader} = Printable;

describe("Resume", function () {
    const testResumeJsonString = JSON.stringify(testResumeJson);
    let stubResume;

    beforeEach(function () {
        stubResume = JSON.parse(testResumeJsonString);
    });

    it("renders", function () {
        const rendered = shallow(<Resume resume={stubResume}/>);

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

        const rendered = shallow(<Resume resume={stubResume}/>);

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

        const rendered = shallow(<Resume resume={stubResume}/>);

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

        const rendered = shallow(<Resume resume={stubResume}/>);

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

        const rendered = shallow(<Resume resume={stubResume}/>);

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

        const rendered = shallow(<Resume resume={stubResume}/>);

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

        const rendered = shallow(<Resume resume={stubResume}/>);

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

        const rendered = shallow(<Resume resume={stubResume}/>);

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

        const rendered = shallow(<Resume resume={stubResume}/>);

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

        const rendered = shallow(<Resume resume={stubResume}/>);

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

        const rendered = shallow(<Resume resume={stubResume}/>);

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

        const rendered = shallow(<Resume resume={stubResume}/>);

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

        const rendered = shallow(<Resume resume={stubResume}/>);

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
