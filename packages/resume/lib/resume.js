import {Person} from "@randy.tarampi/js";
import {List, Map, Record} from "immutable";
import {Award} from "./award";
import {Education} from "./education";
import {Interest} from "./interest";
import {Language} from "./language";
import {Project} from "./project";
import {Publication} from "./publication";
import {Reference} from "./reference";
import {Skill} from "./skill";
import {Volunteer} from "./volunteer";
import {Work} from "./work";

export class Resume extends Record({
    id: null,
    basics: null,
    work: List(),
    volunteer: List(),
    projects: List(),
    education: List(),
    awards: List(),
    publications: List(),
    skills: List(),
    languages: List(),
    interests: List(),
    references: List(),
    renderOptions: Map(),
    renderExpectations: Map()
}) {
    get pdfRenderOptions() {
        return this.renderOptions ? this.renderOptions.toJS() : null;
    }

    get pdfRenderExpectations() {
        return this.renderExpectations ? this.renderExpectations.toJS() : null;
    }

    get pageSize() {
        return this.renderOptions ? this.renderOptions.get("format") : null;
    }

    get fileName() {
        if (this.get("fileName")) {
            return this.get("fileName");
        }

        return this.id;
    }

    get pdfMetadata() {
        return {
            Author: this.basics.name,
            Creator: this.basics.name,
            Producer: this.basics.name,
            Subject: this.basics.name,
            Title: this.basics.name,
            Keywords: [
                "resume",
                "cv",
                "resume.json",
                "JSON resume",
                "resume-cli",
                "@randy.tarampi/resume",
                this.basics.name,
                this.basics.label,
                this.basics.website,
                this.basics.phone,
                this.basics.email,
                this.fileName
            ]
        };
    }

    static fromJS(js = {}) {
        return new Resume({
            ...js,
            renderOptions: js.renderOptions ? Map(js.renderOptions) : null,
            renderExpectations: js.renderExpectations ? Map(js.renderExpectations) : null,
            basics: js.basics ? Person.fromJS(js.basics) : null,
            work: js.work ? List(js.work.map(work => Work.fromJS(work))) : null,
            volunteer: js.volunteer ? List(js.volunteer.map(volunteer => Volunteer.fromJS(volunteer))) : null,
            projects: js.projects ? List(js.projects.map(project => Project.fromJS(project))) : null,
            education: js.education ? List(js.education.map(education => Education.fromJS(education))) : null,
            awards: js.awards ? List(js.awards.map(award => Award.fromJS(award))) : null,
            publications: js.publications ? List(js.publications.map(publication => Publication.fromJS(publication))) : null,
            skills: js.skills ? List(js.skills.map(skill => Skill.fromJS(skill))) : null,
            languages: js.languages ? List(js.languages.map(language => Language.fromJS(language))) : null,
            interests: js.interests ? List(js.interests.map(interest => Interest.fromJS(interest))) : null,
            references: js.references ? List(js.references.map(reference => Reference.fromJS(reference))) : null
        });
    }

    static fromJSON(json = {}) {
        return new Resume({
            ...json,
            renderOptions: json.renderOptions ? Map(json.renderOptions) : null,
            renderExpectations: json.renderExpectations ? Map(json.renderExpectations) : null,
            basics: json.basics ? Person.fromJSON(json.basics) : null,
            work: json.work ? List(json.work.map(work => Work.fromJSON(work))) : null,
            volunteer: json.volunteer ? List(json.volunteer.map(volunteer => Volunteer.fromJSON(volunteer))) : null,
            projects: json.projects ? List(json.projects.map(project => Project.fromJSON(project))) : null,
            education: json.education ? List(json.education.map(education => Education.fromJSON(education))) : null,
            awards: json.awards ? List(json.awards.map(award => Award.fromJSON(award))) : null,
            publications: json.publications ? List(json.publications.map(publication => Publication.fromJSON(publication))) : null,
            skills: json.skills ? List(json.skills.map(skill => Skill.fromJSON(skill))) : null,
            languages: json.languages ? List(json.languages.map(language => Language.fromJSON(language))) : null,
            interests: json.interests ? List(json.interests.map(interest => Interest.fromJSON(interest))) : null,
            references: json.references ? List(json.references.map(reference => Reference.fromJSON(reference))) : null
        });
    }

    static fromResume(json = {}) {
        return new Resume({
            ...json,
            renderOptions: json.renderOptions ? Map(json.renderOptions) : null,
            renderExpectations: json.renderExpectations ? Map(json.renderExpectations) : null,
            basics: json.basics ? Person.fromResume(json.basics) : null,
            work: json.work ? List(json.work.map(work => Work.fromResume(work))) : null,
            volunteer: json.volunteer ? List(json.volunteer.map(volunteer => Volunteer.fromResume(volunteer))) : null,
            projects: json.projects ? List(json.projects.map(project => Project.fromResume(project))) : null,
            education: json.education ? List(json.education.map(education => Education.fromResume(education))) : null,
            awards: json.awards ? List(json.awards.map(award => Award.fromResume(award))) : null,
            publications: json.publications ? List(json.publications.map(publication => Publication.fromResume(publication))) : null,
            skills: json.skills ? List(json.skills.map(skill => Skill.fromResume(skill))) : null,
            languages: json.languages ? List(json.languages.map(language => Language.fromResume(language))) : null,
            interests: json.interests ? List(json.interests.map(interest => Interest.fromResume(interest))) : null,
            references: json.references ? List(json.references.map(reference => Reference.fromResume(reference))) : null
        });
    }

    toSchema() {
        return this.basics ? this.basics.toSchema() : null;
    }
}

export default Resume;
