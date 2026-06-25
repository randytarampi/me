import {readFileSync} from "fs";
import Resume from "./resume.js";

const baseResume = JSON.parse(readFileSync("src/resumes/resume.json", "utf8"));

export const buildResume = (resumeTemplate, id) => {
    const json = Object.assign({}, baseResume, resumeTemplate);
    const resume = Resume.fromResume({
        ...json,
        id,
    });
    return resume;
};

export default buildResume;
