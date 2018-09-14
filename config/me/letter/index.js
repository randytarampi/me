const me = require("../persons/me");
const profiles = require("../profiles");

module.exports = {
    sender: {
        ...me,
        profiles
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
        format: "A4",
        mediaType: "print"
    }
};
