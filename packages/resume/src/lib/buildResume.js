import baseResume from "../resumes/resume.json";
import Resume from "./resume";

export const buildResume = (resumeTemplate, id) => {
    const json = Object.assign({}, baseResume, resumeTemplate);
    const resume = Resume.fromResume({
        ...json,
        id,
    });
    return resume;
};

export default buildResume;
