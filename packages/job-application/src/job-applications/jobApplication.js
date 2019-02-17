const config = require("config");
const letter = require("@randy.tarampi/letter/src/letters/letter.json");
const defaultCustomContent = require("@randy.tarampi/resume/src/resume-custom-content");

const resume = config.get("me.resume");

module.exports = {
    id: "a4",
    letter,
    resume: {
        ...resume,
        customContent: defaultCustomContent.default
    }
};
