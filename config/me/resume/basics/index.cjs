const person = require("../../persons/me/index.cjs");
const {buildResumeProfilesByName} = require("../../util.cjs");

module.exports = {
    ...person,
    profiles: buildResumeProfilesByName(["GitHub", "LinkedIn", "Flickr", "AngelList", "StackOverflow"])
};
