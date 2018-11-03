const resume = require("@randy.tarampi/resume/src/resumes/resume.json");
const letter = require("@randy.tarampi/letter/src/letters/letter.json");
const defaultCustomContent = require("@randy.tarampi/resume/src/resume-custom-content");

module.exports = {
    id: "a4",
    letter,
    resume: {
        ...resume,
        customContent: defaultCustomContent.default
    }
};
