const campaign = require("./campaign.cjs");
const letter = require("./letter/index.cjs");
const resume = require("./resume/index.cjs");
const profiles = require("./profiles.cjs");
const util = require("./util.cjs");
const person = require("./persons/me/index.cjs");

module.exports = {
    person,
    profiles,
    resume,
    letter,
    campaign,
    util
};
