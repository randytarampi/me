const person = require("../../persons/me/index.cjs");
const {buildResumeProfilesByName} = require("../../util.cjs");

module.exports = {
    ...person,
    profiles: buildResumeProfilesByName(["GitHub", "Instagram", "LinkedIn", "Flickr", "AngelList", "StackOverflow"])
};
