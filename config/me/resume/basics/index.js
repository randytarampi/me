const person = require("../../persons/me");
const profiles = require("../../profiles");

module.exports = {
    ...person,
    profiles: profiles.slice(0, 6)
};
