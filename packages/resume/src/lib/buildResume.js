import config from "config";
import baseResume from "../resumes";
import Resume from "./resume";

export const buildResume = (resumeTemplate, id) => {
    const json = Object.assign({}, baseResume, resumeTemplate);
    const resume = Resume.fromResume({
        renderExpectations: config.has("resume.expectations")
            ? config.get("resume.expectations")
            : null,
        ...json,
        id,
    });
    return resume;
};

export default buildResume;
