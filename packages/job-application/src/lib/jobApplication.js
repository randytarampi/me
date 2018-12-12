import {Letter, defaultLetterJson} from "@randy.tarampi/letter";
import {Resume, defaultResumeJson} from "@randy.tarampi/resume";
import {List, Map, Record} from "immutable";
import _ from "lodash";
import packageJson from "../../package";

const defaultResume = Resume.fromResume(defaultResumeJson);
const defaultLetter = Letter.fromJSON(defaultLetterJson);
const defaultRenderOptions = Map({
    format: "A4",
    mediaType: "print",

    source: packageJson.name,
    medium: "pdf",
    content: `${packageJson.version}`
});

export class JobApplication extends Record({
    id: null,
    resume: defaultResume,
    letter: defaultLetter,
    renderOptions: defaultRenderOptions,
    renderExpectations: null,
    tags: List(),
    meta: Map()
}) {
    get basics() {
        return this.sender;
    }

    get sender() {
        return this.letter.sender;
    }

    get recipient() {
        return this.letter.recipient;
    }

    get resume() {
        const resume = this.get("resume");

        return resume
            .set("basics", this.basics)
            .set("id", this.id)
            .set("filename", `${resume.filename ? resume.filename : this.id}.resume`)
            .set("renderOptions", this.renderOptions ? this.renderOptions.merge(resume.renderOptions) : resume.renderOptions)
            .set("renderExpectations", this.renderExpectations ? this.renderExpectations.merge(resume.renderExpectations) : this.renderExpectations);
    }

    get letter() {
        const letter = this.get("letter");

        return letter
            .set("id", this.id)
            .set("filename", `${letter.filename ? letter.filename : this.id}.letter`)
            .set("renderOptions", this.renderOptions ? this.renderOptions.merge(letter.renderOptions) : letter.renderOptions)
            .set("renderExpectations", this.renderExpectations ? this.renderExpectations.merge(letter.renderExpectations) : this.renderExpectations);
    }

    get renderOptions() {
        return this.get("renderOptions")
            ? this.get("renderOptions")
            : this.get("letter").renderOptions;
    }

    get pdfRenderOptions() {
        return this.renderOptions
            ? this.renderOptions.toJS()
            : this.get("letter").pdfRenderOptions;
    }

    get renderExpectations() {
        return this.get("renderExpectations")
            ? this.get("renderExpectations")
            : this.get("letter").renderExpectations;
    }

    get pdfRenderExpectations() {
        return this.renderExpectations
            ? this.renderExpectations.toJS()
            : this.get("letter").pdfRenderExpectations;
    }

    get pageSize() {
        return this.renderOptions && this.renderOptions.get("format")
            ? this.renderOptions.get("format")
            : this.letter.pageSize;
    }

    static fromJS(js = {}) {
        const jobApplication = new JobApplication({
            ...js,
            letter: js.letter
                ? Letter.fromJS(js.letter)
                : defaultLetter,
            resume: js.resume
                ? Resume.fromJS(js.resume)
                : defaultResume,
            renderOptions: js.renderOptions
                ? Map(js.renderOptions)
                : defaultRenderOptions,
            renderExpectations: js.renderExpectations
                ? Map(js.renderExpectations)
                : null,
            tags: js.tags
                ? List(js.tags)
                : List(),
            meta: js.meta
                ? Map(js.meta)
                : Map()
        });

        return buildCampaignParameters(jobApplication);
    }

    static fromJSON(js = {}) {
        const jobApplication = new JobApplication({
            ...js,
            letter: js.letter
                ? Letter.fromJSON(js.letter)
                : defaultLetter,
            resume: js.resume
                ? Resume.fromJSON(js.resume)
                : defaultResume,
            renderOptions: js.renderOptions
                ? Map(js.renderOptions)
                : defaultRenderOptions,
            renderExpectations: js.renderExpectations
                ? Map(js.renderExpectations)
                : null,
            tags: js.tags
                ? List(js.tags)
                : List(),
            meta: js.meta
                ? Map(js.meta)
                : Map()
        });

        return buildCampaignParameters(jobApplication);
    }
}

export default JobApplication;

const buildCampaignParameters = jobApplication => {
    const tags = jobApplication.tags;

    let renderOptions = jobApplication.renderOptions;

    const {
        format = defaultRenderOptions.get("format"),
        name = defaultRenderOptions.get("name"),
        term = defaultRenderOptions.get("term"),
        content = defaultRenderOptions.get("content")
    } = renderOptions.toJS();

    let contentList = content ? content.split(",") : [];

    contentList = contentList.concat([
        packageJson.version
    ]);

    if (format) {
        contentList = contentList.concat([
            format.toLowerCase()
        ]);
    }

    let nameList = name ? name.split(",") : [];

    if (jobApplication.id) {
        nameList = nameList.concat([
            jobApplication.id.toLowerCase()
        ]);
    }

    let termList = term ? term.split("+") : [];

    if (tags.size) {
        termList = termList.concat(tags.toJS());
    }

    renderOptions = renderOptions.set("content", _.sortedUniq(contentList.sort()).join(","));
    renderOptions = renderOptions.set("name", _.sortedUniq(nameList.sort()).join(","));
    renderOptions = renderOptions.set("term", _.sortedUniq(termList.sort()).join("+"));

    return jobApplication.set("renderOptions", renderOptions);
};
