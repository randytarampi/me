import {Record} from "immutable";

export class ResumeCustomPrintableSectionContent extends Record({
    label: null,
    labelNode: null,
    description: null,
    descriptionNode: null
}) {
}

export class ResumeCustomContent extends Record({
    awards: new ResumeCustomPrintableSectionContent(),
    education: new ResumeCustomPrintableSectionContent(),
    projects: new ResumeCustomPrintableSectionContent(),
    publications: new ResumeCustomPrintableSectionContent(),
    skills: new ResumeCustomPrintableSectionContent(),
    volunteer: new ResumeCustomPrintableSectionContent(),
    work: new ResumeCustomPrintableSectionContent(),
    about: new ResumeCustomPrintableSectionContent(),
    contact: new ResumeCustomPrintableSectionContent(),
    interests: new ResumeCustomPrintableSectionContent(),
    languages: new ResumeCustomPrintableSectionContent(),
    profiles: new ResumeCustomPrintableSectionContent(),
    references: new ResumeCustomPrintableSectionContent()
}) {
}
