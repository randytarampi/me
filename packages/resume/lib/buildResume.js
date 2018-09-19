import baseResume from "../resumes/default";
import Resume from "./resume";
import config from "config";

export const buildResume = (resumeTemplate, id) => {
    const json = Object.assign({}, baseResume, resumeTemplate);
    const resume = Resume.fromResume({
        renderExpectations: config.get("resume.expectations"),
        ...json,
        id,
    });
    return resume;
};

export default buildResume;
