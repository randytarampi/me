import {Person} from "@randy.tarampi/js";
import {expect} from "chai";
import {List} from "immutable";
import packageJson from "../../../../package";
import Award from "../../../../src/lib/award";
import Education from "../../../../src/lib/education";
import Interest from "../../../../src/lib/interest";
import Language from "../../../../src/lib/language";
import Project from "../../../../src/lib/project";
import Publication from "../../../../src/lib/publication";
import Reference from "../../../../src/lib/reference";
import Resume from "../../../../src/lib/resume";
import Skill from "../../../../src/lib/skill";
import Volunteer from "../../../../src/lib/volunteer";
import Work from "../../../../src/lib/work";
import testResumeJson from "../../../../src/resumes/test";

describe("Resume", function () {
    let stubResumeJs;

    beforeEach(function () {
        stubResumeJs = Object.assign({
            renderOptions: {
                format: "bar"
            },
            renderExpectations: {
                pages: "baz"
            }
        }, testResumeJson);
    });

    describe("constructor", function () {
        it("returns a Resume", function () {
            const resume = new Resume({
                ...stubResumeJs,
                basics: Person.fromJSON(stubResumeJs.basics),
                work: List(stubResumeJs.work.map(Work.fromJSON)),
                volunteer: List(stubResumeJs.volunteer.map(Volunteer.fromJSON)),
                projects: List(stubResumeJs.projects.map(Project.fromJSON)),
                education: List(stubResumeJs.education.map(Education.fromJSON)),
                awards: List(stubResumeJs.awards.map(Award.fromJSON)),
                publications: List(stubResumeJs.publications.map(Publication.fromJSON)),
                skills: List(stubResumeJs.skills.map(Skill.fromJSON)),
                languages: List(stubResumeJs.languages.map(Language.fromJSON)),
                interests: List(stubResumeJs.interests.map(Interest.fromJSON)),
                references: List(stubResumeJs.references.map(Reference.fromJSON))
            });

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.basics).to.be.instanceOf(Person);
            expect(resume.work).to.be.instanceOf(List);
            resume.work.forEach(work => expect(work).to.be.instanceOf(Work));
            expect(resume.volunteer).to.be.instanceOf(List);
            resume.volunteer.forEach(volunteer => expect(volunteer).to.be.instanceOf(Volunteer));
            expect(resume.projects).to.be.instanceOf(List);
            resume.projects.forEach(project => expect(project).to.be.instanceOf(Project));
            expect(resume.education).to.be.instanceOf(List);
            resume.education.forEach(education => expect(education).to.be.instanceOf(Education));
            expect(resume.awards).to.be.instanceOf(List);
            resume.awards.forEach(award => expect(award).to.be.instanceOf(Award));
            expect(resume.publications).to.be.instanceOf(List);
            resume.publications.forEach(publication => expect(publication).to.be.instanceOf(Publication));
            expect(resume.skills).to.be.instanceOf(List);
            resume.skills.forEach(skill => expect(skill).to.be.instanceOf(Skill));
            expect(resume.languages).to.be.instanceOf(List);
            resume.languages.forEach(language => expect(language).to.be.instanceOf(Language));
            expect(resume.interests).to.be.instanceOf(List);
            resume.interests.forEach(interest => expect(interest).to.be.instanceOf(Interest));
            expect(resume.references).to.be.instanceOf(List);
            resume.references.forEach(reference => expect(reference).to.be.instanceOf(Reference));
        });

        it("returns an empty Resume", function () {
            const resume = new Resume();

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.basics).to.eql(null);
            expect(resume.work).to.eql(List());
            expect(resume.volunteer).to.eql(List());
            expect(resume.projects).to.eql(List());
            expect(resume.education).to.eql(List());
            expect(resume.awards).to.eql(List());
            expect(resume.publications).to.eql(List());
            expect(resume.skills).to.eql(List());
            expect(resume.languages).to.eql(List());
            expect(resume.interests).to.eql(List());
            expect(resume.references).to.eql(List());
        });
    });

    describe(".fromJS", function () {
        it("returns a Resume", function () {
            const resume = Resume.fromJS({
                ...stubResumeJs
            });

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.basics).to.be.instanceOf(Person);
            expect(resume.work).to.be.instanceOf(List);
            resume.work.forEach(work => expect(work).to.be.instanceOf(Work));
            expect(resume.volunteer).to.be.instanceOf(List);
            resume.volunteer.forEach(volunteer => expect(volunteer).to.be.instanceOf(Volunteer));
            expect(resume.projects).to.be.instanceOf(List);
            resume.projects.forEach(project => expect(project).to.be.instanceOf(Project));
            expect(resume.education).to.be.instanceOf(List);
            resume.education.forEach(education => expect(education).to.be.instanceOf(Education));
            expect(resume.awards).to.be.instanceOf(List);
            resume.awards.forEach(award => expect(award).to.be.instanceOf(Award));
            expect(resume.publications).to.be.instanceOf(List);
            resume.publications.forEach(publication => expect(publication).to.be.instanceOf(Publication));
            expect(resume.skills).to.be.instanceOf(List);
            resume.skills.forEach(skill => expect(skill).to.be.instanceOf(Skill));
            expect(resume.languages).to.be.instanceOf(List);
            resume.languages.forEach(language => expect(language).to.be.instanceOf(Language));
            expect(resume.interests).to.be.instanceOf(List);
            resume.interests.forEach(interest => expect(interest).to.be.instanceOf(Interest));
            expect(resume.references).to.be.instanceOf(List);
            resume.references.forEach(reference => expect(reference).to.be.instanceOf(Reference));
        });

        it("returns an empty Resume", function () {
            const resume = Resume.fromJS();

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.basics).to.eql(null);
            expect(resume.work).to.eql(null);
            expect(resume.volunteer).to.eql(null);
            expect(resume.projects).to.eql(null);
            expect(resume.education).to.eql(null);
            expect(resume.awards).to.eql(null);
            expect(resume.publications).to.eql(null);
            expect(resume.skills).to.eql(null);
            expect(resume.languages).to.eql(null);
            expect(resume.interests).to.eql(null);
            expect(resume.references).to.eql(null);
        });
    });

    describe(".fromJSON", function () {
        it("returns a Resume", function () {
            const resume = Resume.fromJSON({
                ...stubResumeJs
            });

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.basics).to.be.instanceOf(Person);
            expect(resume.work).to.be.instanceOf(List);
            resume.work.forEach(work => expect(work).to.be.instanceOf(Work));
            expect(resume.volunteer).to.be.instanceOf(List);
            resume.volunteer.forEach(volunteer => expect(volunteer).to.be.instanceOf(Volunteer));
            expect(resume.projects).to.be.instanceOf(List);
            resume.projects.forEach(project => expect(project).to.be.instanceOf(Project));
            expect(resume.education).to.be.instanceOf(List);
            resume.education.forEach(education => expect(education).to.be.instanceOf(Education));
            expect(resume.awards).to.be.instanceOf(List);
            resume.awards.forEach(award => expect(award).to.be.instanceOf(Award));
            expect(resume.publications).to.be.instanceOf(List);
            resume.publications.forEach(publication => expect(publication).to.be.instanceOf(Publication));
            expect(resume.skills).to.be.instanceOf(List);
            resume.skills.forEach(skill => expect(skill).to.be.instanceOf(Skill));
            expect(resume.languages).to.be.instanceOf(List);
            resume.languages.forEach(language => expect(language).to.be.instanceOf(Language));
            expect(resume.interests).to.be.instanceOf(List);
            resume.interests.forEach(interest => expect(interest).to.be.instanceOf(Interest));
            expect(resume.references).to.be.instanceOf(List);
            resume.references.forEach(reference => expect(reference).to.be.instanceOf(Reference));
        });

        it("returns an empty Resume", function () {
            const resume = Resume.fromJSON();

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.basics).to.eql(null);
            expect(resume.work).to.eql(null);
            expect(resume.volunteer).to.eql(null);
            expect(resume.projects).to.eql(null);
            expect(resume.education).to.eql(null);
            expect(resume.awards).to.eql(null);
            expect(resume.publications).to.eql(null);
            expect(resume.skills).to.eql(null);
            expect(resume.languages).to.eql(null);
            expect(resume.interests).to.eql(null);
            expect(resume.references).to.eql(null);
        });
    });

    describe(".fromResume", function () {
        it("returns a Resume", function () {
            const resume = Resume.fromResume({
                ...stubResumeJs
            });

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.basics).to.be.instanceOf(Person);
            expect(resume.work).to.be.instanceOf(List);
            resume.work.forEach(work => expect(work).to.be.instanceOf(Work));
            expect(resume.volunteer).to.be.instanceOf(List);
            resume.volunteer.forEach(volunteer => expect(volunteer).to.be.instanceOf(Volunteer));
            expect(resume.projects).to.be.instanceOf(List);
            resume.projects.forEach(project => expect(project).to.be.instanceOf(Project));
            expect(resume.education).to.be.instanceOf(List);
            resume.education.forEach(education => expect(education).to.be.instanceOf(Education));
            expect(resume.awards).to.be.instanceOf(List);
            resume.awards.forEach(award => expect(award).to.be.instanceOf(Award));
            expect(resume.publications).to.be.instanceOf(List);
            resume.publications.forEach(publication => expect(publication).to.be.instanceOf(Publication));
            expect(resume.skills).to.be.instanceOf(List);
            resume.skills.forEach(skill => expect(skill).to.be.instanceOf(Skill));
            expect(resume.languages).to.be.instanceOf(List);
            resume.languages.forEach(language => expect(language).to.be.instanceOf(Language));
            expect(resume.interests).to.be.instanceOf(List);
            resume.interests.forEach(interest => expect(interest).to.be.instanceOf(Interest));
            expect(resume.references).to.be.instanceOf(List);
            resume.references.forEach(reference => expect(reference).to.be.instanceOf(Reference));
        });

        it("returns an empty Resume", function () {
            const resume = Resume.fromResume();

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.basics).to.eql(null);
            expect(resume.work).to.eql(null);
            expect(resume.volunteer).to.eql(null);
            expect(resume.projects).to.eql(null);
            expect(resume.education).to.eql(null);
            expect(resume.awards).to.eql(null);
            expect(resume.publications).to.eql(null);
            expect(resume.skills).to.eql(null);
            expect(resume.languages).to.eql(null);
            expect(resume.interests).to.eql(null);
            expect(resume.references).to.eql(null);
        });
    });

    describe("#pdfRenderOptions", function () {
        it("returns `renderOptions` as JS Object", function () {
            const resume = Resume.fromJS(stubResumeJs);

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.pdfRenderOptions).to.eql(stubResumeJs.renderOptions);
        });

        it("returns `null` if no `renderOptions`", function () {
            delete stubResumeJs.renderOptions;

            const resume = Resume.fromJS(stubResumeJs);

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.pdfRenderOptions).to.eql(null);
        });
    });

    describe("#pdfrenderExpectations", function () {
        it("returns `renderExpectations` as JS Object", function () {
            const resume = Resume.fromJS(stubResumeJs);

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.pdfRenderExpectations).to.eql(stubResumeJs.renderExpectations);
        });

        it("returns `null` if no `renderExpectations`", function () {
            delete stubResumeJs.renderExpectations;

            const resume = Resume.fromJS(stubResumeJs);

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.pdfRenderExpectations).to.eql(null);
        });
    });

    describe("#pageSize", function () {
        it("returns `renderOptions.format`", function () {
            const resume = Resume.fromJS(stubResumeJs);

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.pageSize).to.eql(stubResumeJs.renderOptions.format);
        });

        it("returns `null` if no `renderOptions`", function () {
            delete stubResumeJs.renderOptions;

            const resume = Resume.fromJS(stubResumeJs);

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.pdfRenderOptions).to.eql(null);
        });
    });

    describe("#fileName", function () {
        it("returns `fileName`", function () {
            stubResumeJs.fileName = "woof";
            const resume = Resume.fromJS(stubResumeJs);

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.fileName).to.eql(stubResumeJs.fileName);
        });

        it("returns `id` if no `fileName`", function () {
            const resume = Resume.fromJS(stubResumeJs);

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.fileName).to.eql(null);
        });
    });

    describe("#pdfMetadata", function () {
        it("returns ExifTool parsable tags", function () {
            const resume = Resume.fromJS(stubResumeJs);

            expect(resume).to.be.ok;
            expect(resume).to.be.instanceOf(Resume);
            expect(resume.pdfMetadata).to.eql({
                Author: resume.basics.name,
                Creator: resume.basics.name,
                Producer: resume.basics.name,
                Subject: resume.basics.name,
                Title: resume.basics.name,
                Keywords: [
                    "resume-cli",
                    "jsonresume",
                    "jsonresume-theme",
                    packageJson.name,
                    "theme",
                    "resume",
                    "cv",
                    "curriculum vitae",
                    "curriculum",
                    "portfolio",
                    "json resume",
                    "jsonresume theme",
                    "theme",
                    resume.basics.name,
                    resume.basics.label,
                    resume.basics.website,
                    resume.basics.phone,
                    resume.basics.email,
                    resume.fileName
                ]
            });
        });
    });
});
