const me = require("../persons/me/index.cjs");
const {buildResumeProfilesByName} = require("../util.cjs");

module.exports = {
    sender: {
        ...me,
        profiles: buildResumeProfilesByName()
    },
    recipient: {
        additionalName: "Cover Letter Reader",
        jobTitle: "At some awesome organization",
        address: {
            streetAddress: " ",
            addressLocality: "Somewhere over the rainbow",
            addressRegion: "way up high",
            postalCode: " "
        }
    },
    renderOptions: {
        mediaType: "print"
    }
};
