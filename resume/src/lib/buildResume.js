import Resume from "./resume.js";
// NOTE-RT: a static JSON import (rather than `readFileSync` + a computed `__dirname`/
// `import.meta.url` path) resolves correctly regardless of the caller's working directory,
// and works consistently whether this file runs as real ESM, is compiled to CommonJS by
// Babel, or is bundled by webpack - matching the existing pattern already used for
// `resume.json`/`letter.json` in `index.client.js`.
import baseResume from "../resumes/resume.json" with {type: "json"};

export const buildResume = (resumeTemplate, id) => {
    const json = Object.assign({}, baseResume, resumeTemplate);
    const resume = Resume.fromResume({
        ...json,
        id,
    });
    return resume;
};

export default buildResume;
