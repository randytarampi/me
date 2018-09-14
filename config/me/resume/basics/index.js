const person = require("../../persons/me");
const {buildResumeProfilesByName} = require("../../util");

module.exports = {
    ...person,
    profiles: buildResumeProfilesByName(["GitHub", "Instagram", "LinkedIn", "Flickr", "AngelList", "StackOverflow"])
};
